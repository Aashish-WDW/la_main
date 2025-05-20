import React from 'react';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';

interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  images: string[];
  status: 'active' | 'inactive';
  blockedDates?: { startDate: Date; endDate: Date }[];
}

interface PropertyCardGridProps {
  properties: Property[];
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: 'active' | 'inactive') => void;
  onBlockDates?: (id: string, dates: { startDate: Date; endDate: Date }[]) => void;
  onRemoveBlock?: (id: string, blockIndex: number) => void;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function PropertyCardGrid({
  properties = [],
  onDelete,
  onStatusChange,
  onBlockDates,
  onRemoveBlock,
  className = ''
}: PropertyCardGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ${className}`}
    >
      {properties.map((property) => (
        <motion.div key={property.id} variants={itemVariants}>
          <PropertyCard
            property={property}
            onDelete={onDelete || (() => {})}
            onStatusChange={onStatusChange || (() => {})}
            onBlockDates={onBlockDates ? (id, dates) => onBlockDates(id, [dates]) : () => {}}
            onRemoveBlock={onRemoveBlock || (() => {})}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
