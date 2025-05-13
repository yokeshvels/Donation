import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const SettingsPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Card title="Account Settings" subtitle="Manage your account preferences">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="notifications_match" className="flex-grow">
                  Match notifications
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="notifications_match" 
                    name="notifications_match" 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                    defaultChecked 
                  />
                  <label 
                    htmlFor="notifications_match" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                  ></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="notifications_delivery" className="flex-grow">
                  Delivery updates
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="notifications_delivery" 
                    name="notifications_delivery" 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                    defaultChecked 
                  />
                  <label 
                    htmlFor="notifications_delivery" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
          </div>
          
          <hr className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} />
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="privacy_public" className="flex-grow">
                  Make my donations public
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="privacy_public" 
                    name="privacy_public" 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                    defaultChecked 
                  />
                  <label 
                    htmlFor="privacy_public" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="primary">
              Save Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;