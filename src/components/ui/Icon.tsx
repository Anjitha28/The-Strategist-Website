import {
  ArrowRight, ArrowUpRight, BarChart3, Brain, Bot, LineChart, PieChart, Sparkles,
  Workflow, Rocket, ShieldCheck, Users, Building2, GraduationCap, Landmark, HeartPulse,
  Factory, ShoppingBag, Banknote, Cpu, Layers, Target, Lightbulb, TrendingUp, Handshake,
  Settings, Search, Database, FileText, Gauge, Zap, Cloud, Lock, CheckCircle2, Puzzle,
  Compass, Presentation, BookOpen, Award, Briefcase, Calendar, Clock, Globe, Mail, Phone,
  MapPin, MessageSquare, Linkedin, Facebook, Instagram, Youtube, Twitter, Star, Quote,
  PlayCircle, Download, Eye, Filter, Grid3x3, Palette, Server, Boxes, Network, Wand2,
  BadgeCheck, Users2, Building, Newspaper, PenTool, Headphones, ClipboardList, LayoutGrid,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  "arrow-right": ArrowRight, "arrow-up-right": ArrowUpRight, "bar-chart": BarChart3,
  brain: Brain, bot: Bot, "line-chart": LineChart, "pie-chart": PieChart, sparkles: Sparkles,
  workflow: Workflow, rocket: Rocket, "shield-check": ShieldCheck, users: Users,
  building: Building2, "graduation-cap": GraduationCap, landmark: Landmark,
  "heart-pulse": HeartPulse, factory: Factory, "shopping-bag": ShoppingBag, banknote: Banknote,
  cpu: Cpu, layers: Layers, target: Target, lightbulb: Lightbulb, "trending-up": TrendingUp,
  handshake: Handshake, settings: Settings, search: Search, database: Database,
  "file-text": FileText, gauge: Gauge, zap: Zap, cloud: Cloud, lock: Lock,
  "check-circle": CheckCircle2, puzzle: Puzzle, compass: Compass, presentation: Presentation,
  "book-open": BookOpen, award: Award, briefcase: Briefcase, calendar: Calendar, clock: Clock,
  globe: Globe, mail: Mail, phone: Phone, "map-pin": MapPin, "message-square": MessageSquare,
  linkedin: Linkedin, facebook: Facebook, instagram: Instagram, youtube: Youtube,
  twitter: Twitter, star: Star, quote: Quote, "play-circle": PlayCircle, download: Download,
  eye: Eye, filter: Filter, grid: Grid3x3, palette: Palette, server: Server, boxes: Boxes,
  network: Network, wand: Wand2, "badge-check": BadgeCheck, "users-2": Users2,
  "building-2": Building, newspaper: Newspaper, "pen-tool": PenTool, headphones: Headphones,
  clipboard: ClipboardList, "layout-grid": LayoutGrid,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name?: string | null;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = (name && MAP[name]) || Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
