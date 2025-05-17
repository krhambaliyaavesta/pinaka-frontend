'use client';

interface FooterProps {
  companyName?: string;
}

export const Footer: React.FC<FooterProps> = ({ companyName = 'Avesta Legends' }) => {
  return (
    <footer className="bg-teal-500 border-t border-gray-200 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-white font-semibold">Made by {companyName}</p>
      </div>
    </footer>
  );
};

export default Footer; 