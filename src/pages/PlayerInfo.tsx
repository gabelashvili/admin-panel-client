import { useParams } from 'react-router-dom';
import playerApi from '../store/api/playerApi';

const PlayerInfo = () => {
  const { playerId } = useParams();
  const { isError } = playerApi.useGetPlayerQuery(playerId);
  return <div>PlayerInfo</div>;
};

export default PlayerInfo;
