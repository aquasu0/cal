import React from 'react';

type HistoryProps = {
  history: string[];
};

const History: React.FC<HistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500 text-center">아직 계산 기록이 없습니다.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg max-h-60 overflow-y-auto history-container">
      <h3 className="font-bold mb-2">계산 기록</h3>
      <ul className="space-y-2">
        {history.map((item, index) => (
          <li key={index} className="p-2 bg-white rounded border border-gray-200">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History; 