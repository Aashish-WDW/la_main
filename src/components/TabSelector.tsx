import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabSelectorProps {
  tabs: Tab[];
  selectedTab: string;
  onSelectTab: (tabId: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  selectedTab,
  onSelectTab,
}) => {
  return (
    <div className="flex overflow-x-auto gap-3 py-4 px-4 no-scrollbar bg-white">
      {tabs.map((tab) => {
        const isActive = selectedTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`cursor-pointer whitespace-nowrap text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-300
              ${isActive
                ? 'border-[#00aeef] text-[#00aeef] bg-[#00aeef]/5 shadow-lg hover:bg-[#00aeef]/10'
                : 'border-gray-200 text-gray-500 bg-white hover:border-[#00aeef]/30 hover:text-[#00aeef] hover:bg-[#00aeef]/5 shadow-sm'}
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabSelector;
