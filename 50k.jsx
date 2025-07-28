import React, { useState, useEffect } from 'react';

// Define your training plan data with estimated numerical values for calculations
// 'type' helps categorize for infographics
// 'runMiles' for estimated running distance
// 'rideMinutes' for estimated riding duration
// 'durationMinutes' for other activity durations (ST, ER, MR)
const trainingPlan = [
    { date: '2025-07-28', description: 'ER (30-40 min)', type: 'run', durationMinutes: 35, runMiles: 3.5 }, // Assuming 10 min/mile for easy
    { date: '2025-07-29', description: 'ST (30 min) + CT (Riding) (30-45 min)', type: 'combo', durationMinutes: 30, rideMinutes: 37.5 },
    { date: '2025-07-30', description: 'ER (45 min)', type: 'run', durationMinutes: 45, runMiles: 4.5 },
    { date: '2025-07-31', description: 'CT (Riding) (45-60 min)', type: 'ride', rideMinutes: 52.5 },
    { date: '2025-08-01', description: 'ER (30-40 min)', type: 'run', durationMinutes: 35, runMiles: 3.5 },
    { date: '2025-08-02', description: 'LR (6-8 miles)', type: 'run', runMiles: 7 },
    { date: '2025-08-03', description: 'RD', type: 'rest' },
    { date: '2025-08-04', description: 'ER (30-40 min)', type: 'run', durationMinutes: 35, runMiles: 3.5 },
    { date: '2025-08-05', description: 'ST (30 min) + CT (Riding) (30-45 min)', type: 'combo', durationMinutes: 30, rideMinutes: 37.5 },
    { date: '2025-08-06', description: 'MR (45-60 min; hills)', type: 'run', durationMinutes: 52.5, runMiles: 5.25 },
    { date: '2025-08-07', description: 'CT (Riding) (45-60 min)', type: 'ride', rideMinutes: 52.5 },
    { date: '2025-08-08', description: 'ER (30-40 min)', type: 'run', durationMinutes: 35, runMiles: 3.5 },
    { date: '2025-08-09', description: 'LR (8-10 miles)', type: 'run', runMiles: 9 },
    { date: '2025-08-10', description: 'RD', type: 'rest' },
    { date: '2025-08-11', description: 'ER (30 min)', type: 'run', durationMinutes: 30, runMiles: 3 },
    { date: '2025-08-12', description: 'ST (20-30 min light) + CT (Riding) (20-30 min)', type: 'combo', durationMinutes: 25, rideMinutes: 25 },
    { date: '2025-08-13', description: 'ER (20-30 min)', type: 'run', durationMinutes: 25, runMiles: 2.5 },
    { date: '2025-08-14', description: 'CT (Riding) (30 min) or RD', type: 'ride', rideMinutes: 30 }, // Assuming ride
    { date: '2025-08-15', description: 'Very Light Jog (15-20 min) or RD', type: 'run', durationMinutes: 17.5, runMiles: 1.75 },
    { date: '2025-08-16', description: 'LR (6-8 miles, very easy)', type: 'run', runMiles: 7 },
    { date: '2025-08-17', description: 'RD', type: 'rest' },
    { date: '2025-08-18', description: 'ER (20-30 min)', type: 'run', durationMinutes: 25, runMiles: 2.5 },
    { date: '2025-08-19', description: 'ER (20 min)', type: 'run', durationMinutes: 20, runMiles: 2 },
    { date: '2025-08-20', description: 'RD / Light Stretching', type: 'rest' },
    { date: '2025-08-21', description: 'RD', type: 'rest' },
    { date: '2025-08-22', description: 'Very Light Jog (15 min) or RD', type: 'run', durationMinutes: 15, runMiles: 1.5 },
    { date: '2025-08-23', description: '1/2 MARATHON RACE!', type: 'race', runMiles: 13.1 },
    { date: '2025-08-24', description: 'RD / Light Walk', type: 'rest' },
    { date: '2025-08-25', description: 'RD / Light Stretching', type: 'rest' },
    { date: '2025-08-26', description: 'CT (Riding) (30-45 min, easy)', type: 'ride', rideMinutes: 37.5 },
    { date: '2025-08-27', description: 'ER (30 min)', type: 'run', durationMinutes: 30, runMiles: 3 },
    { date: '2025-08-28', description: 'CT (Riding) (30-45 min, easy)', type: 'ride', rideMinutes: 37.5 },
    { date: '2025-08-29', description: 'ER (30 min)', type: 'run', durationMinutes: 30, runMiles: 3 },
    { date: '2025-08-30', description: 'LR (8-10 miles, very easy)', type: 'run', runMiles: 9 },
    { date: '2025-08-31', description: 'RD', type: 'rest' },
    { date: '2025-09-01', description: 'ER (40 min)', type: 'run', durationMinutes: 40, runMiles: 4 },
    { date: '2025-09-02', description: 'ST (30 min) + CT (Riding) (30-45 min)', type: 'combo', durationMinutes: 30, rideMinutes: 37.5 },
    { date: '2025-09-03', description: 'MR (60 min; consistent effort)', type: 'run', durationMinutes: 60, runMiles: 6 },
    { date: '2025-09-04', description: 'CT (Riding) (60 min)', type: 'ride', rideMinutes: 60 },
    { date: '2025-09-05', description: 'ER (30-40 min)', type: 'run', durationMinutes: 35, runMiles: 3.5 },
    { date: '2025-09-06', description: 'LR (12-14 miles) or Long Ride (2-3 hours)', type: 'run', runMiles: 13, rideMinutes: 150 }, // Assuming run, but adding ride option
    { date: '2025-09-07', description: 'RD', type: 'rest' },
    { date: '2025-09-08', description: 'ER (45 min)', type: 'run', durationMinutes: 45, runMiles: 4.5 },
    { date: '2025-09-09', description: 'ST (30 min) + CT (Riding) (30-45 min)', type: 'combo', durationMinutes: 30, rideMinutes: 37.5 },
    { date: '2025-09-10', description: 'MR (75 min; varied terrain)', type: 'run', durationMinutes: 75, runMiles: 7.5 },
    { date: '2025-09-11', description: 'CT (Riding) (60-75 min)', type: 'ride', rideMinutes: 67.5 },
    { date: '2025-09-12', description: 'ER (30-40 min)', type: 'run', durationMinutes: 35, runMiles: 3.5 },
    { date: '2025-09-13', description: 'LR (16-18 miles; CRITICAL, race elements)', type: 'run', runMiles: 17 },
    { date: '2025-09-14', description: 'RD', type: 'rest' },
    { date: '2025-09-15', description: 'ER (45 min)', type: 'run', durationMinutes: 45, runMiles: 4.5 },
    { date: '2025-09-16', description: 'ST (30 min) + CT (Riding) (30-45 min)', type: 'combo', durationMinutes: 30, rideMinutes: 37.5 },
    { date: '2025-09-17', description: 'MR (60 min, easy)', type: 'run', durationMinutes: 60, runMiles: 6 },
    { date: '2025-09-18', description: 'CT (Riding) (60 min)', type: 'ride', rideMinutes: 60 },
    { date: '2025-09-19', description: 'ER (30-40 min)', type: 'run', durationMinutes: 35, runMiles: 3.5 },
    { date: '2025-09-20', description: 'LR (18-22 miles; BIGGEST LONG RUN, race simulation)', type: 'run', runMiles: 20 },
    { date: '2025-09-21', description: 'BB Run (6-8 miles, very easy) or Long Ride (1-1.5 hours) or RD', type: 'run', runMiles: 7, rideMinutes: 75 }, // Assuming run, but adding ride option
    { date: '2025-09-22', description: 'RD', type: 'rest' },
    { date: '2025-09-23', description: 'ER (45 min)', type: 'run', durationMinutes: 45, runMiles: 4.5 },
    { date: '2025-09-24', description: 'ST (30 min) + CT (Riding) (30-45 min)', type: 'combo', durationMinutes: 30, rideMinutes: 37.5 },
    { date: '2025-09-25', description: 'CT (Riding) (60 min)', type: 'ride', rideMinutes: 60 },
    { date: '2025-09-26', description: 'ER (30-40 min)', type: 'run', durationMinutes: 35, runMiles: 3.5 },
    { date: '2025-09-27', description: 'LR (12-14 miles, comfortable)', type: 'run', runMiles: 13 },
    { date: '2025-09-28', description: 'RD', type: 'rest' },
    { date: '2025-09-29', description: 'ER (45 min)', type: 'run', durationMinutes: 45, runMiles: 4.5 },
    { date: '2025-09-30', description: 'ST (20 min light) + CT (Riding) (30-45 min)', type: 'combo', durationMinutes: 20, rideMinutes: 37.5 },
    { date: '2025-10-01', description: 'MR (45 min, easy)', type: 'run', durationMinutes: 45, runMiles: 4.5 },
    { date: '2025-10-02', description: 'CT (Riding) (45 min)', type: 'ride', rideMinutes: 45 },
    { date: '2025-10-03', description: 'ER (30 min)', type: 'run', durationMinutes: 30, runMiles: 3 },
    { date: '2025-10-04', description: 'LR (8-10 miles)', type: 'run', runMiles: 9 },
    { date: '2025-10-05', description: 'RD', type: 'rest' },
    { date: '2025-10-06', description: 'ER (30 min)', type: 'run', durationMinutes: 30, runMiles: 3 },
    { date: '2025-10-07', description: 'ER (20 min)', type: 'run', durationMinutes: 20, runMiles: 2 },
    { date: '2025-10-08', description: 'CT (Riding) (30 min, very easy)', type: 'ride', rideMinutes: 30 },
    { date: '2025-10-09', description: 'ER (20 min)', type: 'run', durationMinutes: 20, runMiles: 2 },
    { date: '2025-10-10', description: 'RD', type: 'rest' },
    { date: '2025-10-11', description: 'LR (4-5 miles, very easy)', type: 'run', runMiles: 4.5 },
    { date: '2025-10-12', description: 'RD', type: 'rest' },
    { date: '2025-10-13', description: 'ER (20 min)', type: 'run', durationMinutes: 20, runMiles: 2 },
    { date: '2025-10-14', description: 'Light Stretch, Mobility', type: 'other' },
    { date: '2025-10-15', description: 'ER (15 min) - shake out legs', type: 'run', durationMinutes: 15, runMiles: 1.5 },
    { date: '2025-10-16', description: 'RD / Light Walk, Hydrate', type: 'rest' },
    { date: '2025-10-17', description: 'RD / Final Prep, Lay Out Gear, Visualize', type: 'rest' },
    { date: '2025-10-18', description: '50K RACE DAY!', type: 'race', runMiles: 31.07 }, // 50k in miles
    { date: '2025-10-19', description: 'Rest & Celebrate!', type: 'rest' }
];

// Helper to convert 'YYYY-MM-DD' string to Date object (at midnight UTC for consistent comparison)
const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day)); // Month is 0-indexed in Date constructor
};

// Calculate start and end dates of the plan
const startDate = parseDate(trainingPlan[0].date);
const endDate = parseDate(trainingPlan[trainingPlan.length - 1].date);
const totalPlanDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

// Component for the progress bar
const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
            <div
                className="bg-indigo-600 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

// Component for weekly overview
const WeeklyOverview = ({ currentWeekActivities, currentWeekNumber, totalWeeks }) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Normalize today's date to UTC midnight

    const formatDay = (dateString) => {
        const date = parseDate(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Week {currentWeekNumber} of {totalWeeks}
            </h3>
            <ul className="space-y-3">
                {currentWeekActivities.length > 0 ? (
                    currentWeekActivities.map((activity, index) => {
                        const activityDate = parseDate(activity.date);
                        const isToday = activityDate.getTime() === today.getTime();
                        return (
                            <li key={index} className={`flex items-start text-gray-700 ${isToday ? 'font-bold text-indigo-700' : ''}`}>
                                <span className={`w-2 h-2 rounded-full mr-3 mt-1 flex-shrink-0 ${isToday ? 'bg-indigo-600' : 'bg-gray-400'}`}></span>
                                <div>
                                    <span className="font-medium">{formatDay(activity.date)}:</span> {activity.description}
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className="text-gray-500 italic">No scheduled activities for this week.</li>
                )}
            </ul>
        </div>
    );
};

// --- Infographic Components ---

// Pie Chart for Activity Type Breakdown
const PieChart = ({ data }) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    let cumulativeAngle = 0;

    const colors = {
        'run': '#4c51bf', // Indigo
        'ride': '#38a169', // Green
        'combo': '#d69e2e', // Yellow-Orange
        'rest': '#a0aec0', // Gray
        'other': '#63b3ed', // Light Blue
        'race': '#e53e3e' // Red
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Activity Type Breakdown</h3>
            <svg width="200" height="200" viewBox="0 0 100 100" className="mb-4">
                {Object.entries(data).map(([type, value], index) => {
                    if (value === 0) return null;

                    const percentage = (value / total);
                    const angle = percentage * 360;
                    const largeArcFlag = angle > 180 ? 1 : 0;

                    const startAngle = cumulativeAngle;
                    const endAngle = cumulativeAngle + angle;

                    const startX = 50 + 50 * Math.cos(Math.PI * (startAngle - 90) / 180);
                    const startY = 50 + 50 * Math.sin(Math.PI * (startAngle - 90) / 180);
                    const endX = 50 + 50 * Math.cos(Math.PI * (endAngle - 90) / 180);
                    const endY = 50 + 50 * Math.sin(Math.PI * (endAngle - 90) / 180);

                    cumulativeAngle += angle;

                    const d = `M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

                    return (
                        <path
                            key={type}
                            d={d}
                            fill={colors[type] || '#ccc'}
                            stroke="white"
                            strokeWidth="0.5"
                        />
                    );
                })}
            </svg>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                {Object.entries(data).map(([type, value]) => (
                    value > 0 && (
                        <div key={type} className="flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[type] || '#ccc' }}></span>
                            {type.charAt(0).toUpperCase() + type.slice(1)}: {((value / total) * 100).toFixed(1)}%
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

// Bar Chart for Weekly Volume
const BarChart = ({ data, chartType }) => {
    const maxVal = Math.max(...data.map(d => Math.max(d.runMiles || 0, d.rideMinutes / 60 || 0))); // Max of either miles or hours
    const barWidth = 20;
    const spacing = 10;
    const chartHeight = 150;
    const chartWidth = data.length * (barWidth * 2 + spacing) + 50; // Adjusted width for two bars per week + labels

    const colors = {
        'run': '#4c51bf', // Indigo
        'ride': '#38a169' // Green
    };

    return (
        <div className="flex flex-col items-center w-full overflow-x-auto p-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly {chartType === 'miles' ? 'Running Miles' : 'Riding Hours'}</h3>
            <svg width={chartWidth} height={chartHeight + 40} viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} className="bg-white rounded-lg shadow-sm">
                {/* Y-axis line */}
                <line x1="40" y1="0" x2="40" y2={chartHeight} stroke="#e2e8f0" strokeWidth="1" />
                {/* X-axis line */}
                <line x1="40" y1={chartHeight} x2={chartWidth - 10} y2={chartHeight} stroke="#e2e8f0" strokeWidth="1" />

                {/* Y-axis labels */}
                {[0, 0.25, 0.5, 0.75, 1].map(factor => (
                    <text
                        key={factor}
                        x="35"
                        y={chartHeight - (chartHeight * factor)}
                        textAnchor="end"
                        alignmentBaseline="middle"
                        fontSize="10"
                        fill="#6b7280"
                    >
                        {(maxVal * factor).toFixed(0)}
                    </text>
                ))}
                <text x="20" y="10" fontSize="10" fill="#6b7280" textAnchor="middle" transform="rotate(-90 20 10)">{chartType === 'miles' ? 'Miles' : 'Hours'}</text>


                {data.map((weekData, index) => {
                    const xOffset = 50 + index * (barWidth * 2 + spacing);
                    const runHeight = (weekData.runMiles / maxVal) * chartHeight;
                    const rideHeight = (weekData.rideMinutes / 60 / maxVal) * chartHeight; // Convert minutes to hours

                    return (
                        <g key={index}>
                            {/* Run Bar */}
                            <rect
                                x={xOffset}
                                y={chartHeight - runHeight}
                                width={barWidth}
                                height={runHeight}
                                fill={colors.run}
                                rx="3" ry="3" // Rounded corners for bars
                            />
                            {/* Ride Bar */}
                            <rect
                                x={xOffset + barWidth + 2} // Small gap between bars
                                y={chartHeight - rideHeight}
                                width={barWidth}
                                height={rideHeight}
                                fill={colors.ride}
                                rx="3" ry="3" // Rounded corners for bars
                            />
                            {/* Week Label */}
                            <text
                                x={xOffset + barWidth}
                                y={chartHeight + 15}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#4b5563"
                            >
                                Wk {index + 1}
                            </text>
                        </g>
                    );
                })}
            </svg>
            <div className="flex justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.run }}></span>
                    Running (Miles)
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.ride }}></span>
                    Riding (Hours)
                </div>
            </div>
        </div>
    );
};


function App() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Calculate progress and current week
    const daysPassed = Math.max(0, (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const progress = Math.min(100, (daysPassed / totalPlanDays) * 100);

    // Calculate current week number
    const startOfWeek = new Date(startDate);
    startOfWeek.setUTCHours(0, 0, 0, 0); // Normalize to UTC midnight
    startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay()); // Go to the Sunday before or on the start date

    const currentDayNormalized = new Date(currentDate);
    currentDayNormalized.setUTCHours(0, 0, 0, 0);

    const daysSincePlanStartOfWeek = (currentDayNormalized.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24);
    const currentWeekNumber = Math.floor(daysSincePlanStartOfWeek / 7) + 1;

    const totalWeeks = Math.ceil(totalPlanDays / 7);

    // Filter activities for the current week
    const currentWeekActivities = trainingPlan.filter(activity => {
        const activityDate = parseDate(activity.date);
        const diffTime = Math.abs(activityDate.getTime() - currentDayNormalized.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Check if the activity date falls within the current calendar week (Sunday to Saturday)
        const activityDayOfWeek = activityDate.getUTCDay(); // 0 for Sunday, 6 for Saturday
        const currentDayOfWeek = currentDayNormalized.getUTCDay();

        const startOfCurrentWeek = new Date(currentDayNormalized);
        startOfCurrentWeek.setUTCDate(currentDayNormalized.getUTCDate() - currentDayOfWeek); // Set to Sunday of current week
        startOfCurrentWeek.setUTCHours(0,0,0,0);

        const endOfCurrentWeek = new Date(startOfCurrentWeek);
        endOfCurrentWeek.setUTCDate(startOfCurrentWeek.getUTCDate() + 6); // Set to Saturday of current week
        endOfCurrentWeek.setUTCHours(23,59,59,999);

        return activityDate >= startOfCurrentWeek && activityDate <= endOfCurrentWeek;
    });

    // Sort current week activities by date
    currentWeekActivities.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    // --- Data processing for Infographics ---

    // Calculate data for Pie Chart
    const activityTypeCounts = trainingPlan.reduce((acc, activity) => {
        const type = activity.type || 'other'; // Default to 'other' if type is missing
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    // Calculate data for Bar Chart (Weekly Volume)
    const weeklyVolumes = [];
    let currentWeekStart = new Date(startDate);
    currentWeekStart.setUTCHours(0, 0, 0, 0);

    for (let i = 0; i < totalWeeks; i++) {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setUTCDate(currentWeekStart.getUTCDate() + 6); // End of the current week (Saturday)

        let weekRunMiles = 0;
        let weekRideMinutes = 0;

        trainingPlan.forEach(activity => {
            const activityDate = parseDate(activity.date);
            if (activityDate >= currentWeekStart && activityDate <= weekEnd) {
                weekRunMiles += activity.runMiles || 0;
                weekRideMinutes += activity.rideMinutes || 0;
            }
        });

        weeklyVolumes.push({
            week: i + 1,
            runMiles: weekRunMiles,
            rideMinutes: weekRideMinutes
        });

        currentWeekStart.setUTCDate(currentWeekStart.getUTCDate() + 7); // Move to the next week's start
    }


    // Update current date every day (or when component mounts)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000 * 60 * 60 * 24); // Update daily
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-3xl w-full">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    50K Training Progress
                </h1>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Overall Progress</h2>
                    <ProgressBar progress={progress} />
                    <p className="text-right text-lg font-medium text-gray-700">
                        {progress.toFixed(1)}% Complete
                    </p>
                </div>

                <WeeklyOverview
                    currentWeekActivities={currentWeekActivities}
                    currentWeekNumber={currentWeekNumber}
                    totalWeeks={totalWeeks}
                />

                {/* Infographics Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Training Infographics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col items-center">
                            <PieChart data={activityTypeCounts} />
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col items-center">
                            <BarChart data={weeklyVolumes} chartType="volume" />
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-6">
                    Today: {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>
        </div>
    );
}

export default App;
