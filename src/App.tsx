import { useEffect, useState } from 'react';

import './App.css';

interface PlayerPrediction {
  player_name: string;
  team: string;
  points_act: string;
  assists_act: string;
  reboundsTotal_act: string;
  points_pred: number;
  assists_pred: number;
  reboundsTotal_pred: number;
}

function App() {
  const [data, setData] = useState<PlayerPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/predictions.json')
      .then((res) => res.json())
      .then((json) => {
        // Pick only relevant fields for the table
        const simplified = json.map((item: any) => ({
          player_name: item.player_name,
          team: item.team,
          points_act: item.points_act,
          assists_act: item.assists_act,
          reboundsTotal_act: item.reboundsTotal_act,
          points_pred: item.points_pred,
          assists_pred: item.assists_pred,
          reboundsTotal_pred: item.reboundsTotal_pred,
        }));
        setData(simplified);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading predictions…</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>NBA XGBoost Predictor (Demo)</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Team</th>
            <th>Actual Points</th>
            <th>Predicted Δ Points</th>
            <th>Actual Assists</th>
            <th>Predicted Δ Assists</th>
            <th>Actual Rebounds</th>
            <th>Predicted Δ Rebounds</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, idx) => (
            <tr key={idx}>
              <td>{p.player_name}</td>
              <td>{p.team}</td>
              <td>{p.points_act}</td>
              <td>{p.points_pred.toFixed(2)}</td>
              <td>{p.assists_act}</td>
              <td>{p.assists_pred.toFixed(2)}</td>
              <td>{p.reboundsTotal_act}</td>
              <td>{p.reboundsTotal_pred.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
