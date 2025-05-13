import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { Calendar, BarChart, PieChart, TrendingUp, MessageSquare, Activity } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage: React.FC = () => {
  const { theme } = useTheme();
  const [donationData, setDonationData] = useState({
    labels: [] as string[],
    datasets: [] as any[]
  });
  
  const [distributionData, setDistributionData] = useState({
    labels: [] as string[],
    datasets: [] as any[]
  });
  
  const [predictionData, setPredictionData] = useState({
    labels: [] as string[],
    datasets: [] as any[]
  });

  useEffect(() => {
    // Initialize charts with mock data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    // Donation trends data
    setDonationData({
      labels: months,
      datasets: [
        {
          label: 'Clothing',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Food',
          data: [28, 48, 40, 19, 86, 27],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });
    
    // Distribution data
    setDistributionData({
      labels: ['Clothing', 'Food', 'Medical', 'Education', 'Other'],
      datasets: [{
        data: [35, 28, 18, 10, 9],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }],
    });
    
    // Prediction accuracy data
    setPredictionData({
      labels: months,
      datasets: [{
        label: 'Prediction Accuracy',
        data: [92, 93, 91, 94, 92, 95],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }],
    });
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setDonationData(prev => ({
        ...prev,
        datasets: prev.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map(() => Math.floor(Math.random() * 100)),
        })),
      }));
      
      setPredictionData(prev => ({
        ...prev,
        datasets: prev.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map(() => 90 + Math.random() * 5),
        })),
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Analytics & Insights</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
        Gain valuable insights into donation patterns, impact metrics, and AI predictions to make data-driven decisions.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Donations
              </p>
              <h3 className="text-2xl font-bold mt-1">2,856</h3>
              <p className="text-sm flex items-center mt-2 text-green-600 dark:text-green-400">
                <TrendingUp size={14} className="mr-1" />
                <span>+14.6%</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-blue-900 bg-opacity-50' 
                : 'bg-blue-100'
            }`}>
              <BarChart size={20} className="text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Matching Accuracy
              </p>
              <h3 className="text-2xl font-bold mt-1">92.4%</h3>
              <p className="text-sm flex items-center mt-2 text-green-600 dark:text-green-400">
                <TrendingUp size={14} className="mr-1" />
                <span>+3.2%</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-green-900 bg-opacity-50' 
                : 'bg-green-100'
            }`}>
              <Activity size={20} className="text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Feedback Score
              </p>
              <h3 className="text-2xl font-bold mt-1">4.8/5</h3>
              <p className="text-sm flex items-center mt-2 text-green-600 dark:text-green-400">
                <TrendingUp size={14} className="mr-1" />
                <span>+0.3</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-purple-900 bg-opacity-50' 
                : 'bg-purple-100'
            }`}>
              <MessageSquare size={20} className="text-purple-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Distribution Efficiency
              </p>
              <h3 className="text-2xl font-bold mt-1">86.7%</h3>
              <p className="text-sm flex items-center mt-2 text-green-600 dark:text-green-400">
                <TrendingUp size={14} className="mr-1" />
                <span>+5.1%</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-orange-900 bg-opacity-50' 
                : 'bg-orange-100'
            }`}>
              <PieChart size={20} className="text-orange-600" />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Donation Trends" subtitle="Monthly donation volume by category">
          <div className="h-[300px]">
            <Bar data={donationData} options={chartOptions} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Most Donated Category</p>
              <p className="text-lg font-semibold">Clothing</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Highest Growth</p>
              <p className="text-lg font-semibold">Medical Supplies</p>
            </div>
          </div>
        </Card>
        
        <Card title="Donation Distribution" subtitle="Percentage allocation across categories">
          <div className="h-[300px]">
            <Pie data={distributionData} />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            <div>
              <div className={`w-4 h-4 mx-auto rounded-full bg-blue-500`}></div>
              <p className="text-xs mt-1">Clothing</p>
              <p className="text-xs font-semibold">35%</p>
            </div>
            <div>
              <div className={`w-4 h-4 mx-auto rounded-full bg-green-500`}></div>
              <p className="text-xs mt-1">Food</p>
              <p className="text-xs font-semibold">28%</p>
            </div>
            <div>
              <div className={`w-4 h-4 mx-auto rounded-full bg-yellow-500`}></div>
              <p className="text-xs mt-1">Medical</p>
              <p className="text-xs font-semibold">18%</p>
            </div>
            <div>
              <div className={`w-4 h-4 mx-auto rounded-full bg-red-500`}></div>
              <p className="text-xs mt-1">Other</p>
              <p className="text-xs font-semibold">19%</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="AI Prediction Accuracy" subtitle="Model performance metrics">
          <div className="h-[250px]">
            <Line data={predictionData} options={chartOptions} />
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Demand Prediction</span>
              <div className="flex items-center">
                <span className="font-medium mr-2">92%</span>
                <div className="w-32 h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Matching Accuracy</span>
              <div className="flex items-center">
                <span className="font-medium mr-2">94%</span>
                <div className="w-32 h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Category Recognition</span>
              <div className="flex items-center">
                <span className="font-medium mr-2">89%</span>
                <div className="w-32 h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Recent Activity" subtitle="Latest platform events">
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
                }`}>
                  <Calendar size={16} className="text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">New Donation Matched</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Winter Clothing donation matched with Eastside Shelter</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  <TrendingUp size={16} className="text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">AI Model Updated</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Matching algorithm improved with new training data</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'
                }`}>
                  <MessageSquare size={16} className="text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">Feedback Received</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hope Community Center rated their experience 5/5</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-yellow-900' : 'bg-yellow-100'
                }`}>
                  <Activity size={16} className="text-yellow-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">New Demand Prediction</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Medical supplies demand forecasted to increase by 24%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Blockchain Transparency" subtitle="Smart contract activity">
          <div 
            className={`w-full h-[250px] rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <p className="text-gray-500">Blockchain visualization would be displayed here</p>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className={`p-2 rounded ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex justify-between">
                <span className="font-mono text-xs truncate w-32">0x7Fc9...3a24</span>
                <span className="text-green-600 dark:text-green-400">+$500</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Donation to Medical Fund
              </div>
            </div>
            
            <div className={`p-2 rounded ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex justify-between">
                <span className="font-mono text-xs truncate w-32">0x3aB8...9c12</span>
                <span className="text-blue-600 dark:text-blue-400">Transfer</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Fund distribution to recipient
              </div>
            </div>
            
            <div className={`p-2 rounded ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex justify-between">
                <span className="font-mono text-xs truncate w-32">0x8dF1...6b45</span>
                <span className="text-green-600 dark:text-green-400">+$250</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Donation to Education Fund
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;