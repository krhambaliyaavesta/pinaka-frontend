import { IconType } from "react-icons";
import { FaUsers, FaChartLine, FaRegLightbulb, FaTrophy } from "react-icons/fa";

export interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: FaUsers,
    title: "Team Feedback",
    description:
      "Give and receive constructive feedback that helps everyone grow together.",
  },
  {
    icon: FaTrophy,
    title: "Kudos Wall",
    description:
      "Celebrate achievements and recognize great work in a public space.",
  },
  {
    icon: FaChartLine,
    title: "Progress Tracking",
    description:
      "Track individual and team growth over time with detailed analytics.",
  },
  {
    icon: FaRegLightbulb,
    title: "Actionable Insights",
    description:
      "Get insights that matter to help your team improve continuously.",
  },
]; 