import { useCallback } from "react";
import { useParams } from "react-router-dom"
import { GET } from "./service"
import useFetchResult from "./useFetchResult";

const api = {
  getProfile: (uuid) => GET(`https://dashboard.privateprep.com/feeds/profiles/${uuid}`)
}

const Profile = () => {
  const { uuid } = useParams();
  const fetchResult = useCallback(() => api.getProfile(uuid), [uuid]);
  let { isLoading, isRejected, hasFetched, result, error } = useFetchResult(
    fetchResult
  );

  if (isLoading && !hasFetched) {
    return <p>Loading...</p>;
  }

  if (isRejected) {
    return (
      <div>
        <h1>{`Oh no! That's an error!`}</h1>
        <p>{`Here is some more information if you want to take a look...`}</p>
        <details>
          <p>
            <strong>Error:</strong> {error.message.toString()}
          </p>
          <p>
            <strong>Stacktrace:</strong> {error.stack}
          </p>
        </details>
        <p>Please refresh and try again. If this keeps happening, please let support@privateprep.com know!</p>
      </div>
    );
  }

  const { profile } = result;

  return (
    <div>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  )
}

export default Profile
