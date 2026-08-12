// Central registry of admin permissions and default role definitions (RBAC).

export const MODULES = [
  "dashboard",
  "pages",
  "media",
  "blog",
  "products",
  "courses",
  "testimonials",
  "clients",
  "faqs",
  "team",
  "jobs",
  "navigation",
  "forms",
  "newsletter",
  "seo",
  "settings",
  "users",
  "roles",
  "audit",
] as const;

export type ModuleKey = (typeof MODULES)[number];

export const ACTIONS = ["view", "create", "edit", "delete", "publish"] as const;
export type ActionKey = (typeof ACTIONS)[number];

/** Build a permission key like "blog:edit". */
export function perm(module: ModuleKey, action: ActionKey): string {
  return `${module}:${action}`;
}

export const ALL = "*";

export type RoleSeed = {
  name: string;
  description: string;
  isSystem: boolean;
  permissions: string[];
};

const contentModules: ModuleKey[] = [
  "dashboard",
  "pages",
  "media",
  "blog",
  "products",
  "courses",
  "testimonials",
  "clients",
  "faqs",
  "team",
  "jobs",
  "navigation",
  "forms",
  "newsletter",
  "seo",
];

function grantAll(modules: ModuleKey[], actions: readonly ActionKey[] = ACTIONS): string[] {
  const out: string[] = [];
  for (const m of modules) for (const a of actions) out.push(perm(m, a));
  return out;
}

export const DEFAULT_ROLES: RoleSeed[] = [
  {
    name: "Super Administrator",
    description: "Full unrestricted access to every module and setting.",
    isSystem: true,
    permissions: [ALL],
  },
  {
    name: "Administrator",
    description: "Manage all content, forms, users and most settings.",
    isSystem: true,
    permissions: [...grantAll([...contentModules, "users", "audit"]), perm("settings", "view"), perm("settings", "edit")],
  },
  {
    name: "Content Manager",
    description: "Create and edit website content and blog articles.",
    isSystem: true,
    permissions: grantAll(contentModules, ["view", "create", "edit", "publish"]),
  },
  {
    name: "Marketing Manager",
    description: "Manage blog, SEO, testimonials, newsletter and forms.",
    isSystem: true,
    permissions: [
      ...grantAll(["blog", "seo", "testimonials", "clients", "newsletter", "forms"], ["view", "create", "edit", "publish"]),
      perm("dashboard", "view"),
      perm("media", "view"),
      perm("media", "create"),
    ],
  },
  {
    name: "HR Manager",
    description: "Manage careers, job openings and applications.",
    isSystem: true,
    permissions: [
      ...grantAll(["jobs", "team"]),
      perm("dashboard", "view"),
      perm("forms", "view"),
      perm("forms", "edit"),
      perm("media", "view"),
    ],
  },
  {
    name: "Editor",
    description: "Draft and edit content without publishing rights.",
    isSystem: false,
    permissions: grantAll(["pages", "blog", "products", "courses"], ["view", "edit"]).concat(perm("dashboard", "view"), perm("media", "view")),
  },
];

/** Does a set of permission keys satisfy a required permission? */
export function hasPermission(userPerms: string[], required: string): boolean {
  if (userPerms.includes(ALL)) return true;
  return userPerms.includes(required);
}
