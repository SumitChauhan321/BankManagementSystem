import { useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();

  return <h1>User Details : {id}</h1>;
}

export default UserDetails;