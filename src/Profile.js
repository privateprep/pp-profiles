import { useCallback } from "react";
import { useParams } from "react-router-dom"
import { GET } from "./service"
import useFetchResult from "./useFetchResult";

import "./Profile.css"

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
    <div className="container">
      <div className="Profile">
        <div className="Profile__media">
          <img src={profile.pictureUrl} alt={`Headshot of ${profile.name}`} />
        </div>
        <div className="Profile__name">
          <h3>{profile.name}</h3>
          {!!profile.titles.length &&
            profile.titles.map((title, titleIndex) => (
              <h4 key={titleIndex}>{title}</h4>
            ))}
        </div>
        <div className="Profile__content">
          <div className="Profile__detail">
            {!!profile.education.length && (
              <>
                <h4>Education</h4>
                <ul>
                  {profile.education.map((education, eIndex) => (
                    <li key={eIndex}>{education}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {profile.attributes.map((attr, attrIndex) => (
            <div key={attrIndex} className="Profile__detail">
              <h4>{attr.label}</h4>
              <p>{attr.value}</p>
            </div>
          ))}
          {!!profile.focus_areas.length && (
            <div className="Profile__detail">
              <h4>Areas of Focus</h4>
              <ul>
                {profile.focus_areas.map((area, areaIndex) => <li key={areaIndex}>{area}</li>)}
              </ul>
            </div>
          )}
          <div className="Profile__detail Profile__detail--bio">
            <h4>Biography</h4>
            <div className="ProfileBioContent" dangerouslySetInnerHTML={{ __html: profile.formattedBio }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
