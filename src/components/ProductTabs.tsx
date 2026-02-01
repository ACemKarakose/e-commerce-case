import { useState, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface ProductTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function ProductTabs({ tabs, defaultTab }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="space-y-8">
      {/* Tab Headers */}
      <div className="grid w-full grid-cols-3 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex w-full items-center justify-center whitespace-nowrap py-4 text-[10px] font-medium transition-colors min-[370px]:text-xs md:text-sm ${
              activeTab === tab.id
                ? "text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">{activeContent}</div>
    </div>
  );
}
