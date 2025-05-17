import { KudosCardType } from "./molecules/common/KudosCard/KudosCard";
import { FilterOption } from "./atoms/common/FilterDropdown";

export const kudosCards: KudosCardType[] = [
    {
      id: '1',
      type: 'thankYou',
      title: 'Thank You',
      description: 'Express gratitude for someone who helped you.',
      memberName: 'Alex Rodriguez',
      leadershipNote: 'Always ready to help team members, providing timely assistance on critical issues.'
    },
    {
      id: '2',
      type: 'greatJob',
      title: 'Great Job',
      description: 'Recognize excellent performance and achievement.',
      memberName: 'Sarah Johnson',
      leadershipNote: 'Exceptional work on the latest product release, delivering ahead of schedule.'
    },
    {
      id: '3',
      type: 'teamwork',
      title: 'Awesome Teamwork',
      description: 'Celebrate collaboration and team success.',
      memberName: 'Dev Team Alpha',
      leadershipNote: 'Outstanding collaboration on resolving the critical production issue last week.'
    },
    {
      id: '4',
      type: 'support',
      title: 'Support Star',
      description: 'Acknowledge someone who provided valuable support.',
      memberName: 'Michael Chen',
      leadershipNote: 'Going above and beyond to support new team members during onboarding.'
    },
    {
      id: '5',
      type: 'problemSolving',
      title: 'Problem Solving Champion',
      description: 'Recognize innovative solutions and critical thinking.',
      memberName: 'Priya Sharma',
      leadershipNote: 'Creative solution to the database performance issues that saved hours of downtime.'
    },
    {
      id: '6',
      type: 'guidingLight',
      title: 'Guiding Light Award',
      description: 'Appreciate those who mentor and guide others.',
      memberName: 'David Wilson',
      leadershipNote: 'Exceptional mentorship to junior developers, helping them grow their technical skills.'
    },
    {
      id: '7',
      type: 'codeQuality',
      title: 'Code Quality Champion',
      description: 'Honor commitment to excellence in code standards.',
      memberName: 'Emma Garcia',
      leadershipNote: 'Consistent commitment to writing clean, well-documented, and maintainable code.'
    },
    {
      id: '8',
      type: 'aboveAndBeyond',
      title: 'Above and Beyond',
      description: 'Recognize extraordinary effort that exceeds expectations.',
      memberName: 'James Taylor',
      leadershipNote: 'Working through the weekend to ensure the client demo was flawless and successful.'
    }
  ];

// Filter Options for Kudos
export const recipientOptions: FilterOption[] = [
  { id: '1', name: 'Alex Rodriguez' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Michael Chen' },
  { id: '4', name: 'Priya Sharma' },
  { id: '5', name: 'David Wilson' },
  { id: '6', name: 'Emma Garcia' },
  { id: '7', name: 'James Taylor' }
];

export const teamOptions: FilterOption[] = [
  { id: '1', name: 'Engineering' },
  { id: '2', name: 'Product' },
  { id: '3', name: 'Design' },
  { id: '4', name: 'Marketing' },
  { id: '5', name: 'Customer Support' },
  { id: '6', name: 'Sales' },
  { id: '7', name: 'Management' }
];

export const categoryOptions: FilterOption[] = [
  { id: 'thankYou', name: 'Thank You' },
  { id: 'greatJob', name: 'Great Job' },
  { id: 'teamwork', name: 'Awesome Teamwork' },
  { id: 'support', name: 'Support Star' },
  { id: 'problemSolving', name: 'Problem Solving' },
  { id: 'guidingLight', name: 'Guiding Light' },
  { id: 'codeQuality', name: 'Code Quality' },
  { id: 'aboveAndBeyond', name: 'Above and Beyond' }
];