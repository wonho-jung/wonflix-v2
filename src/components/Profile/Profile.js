import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import avatar from "../../assets/netflix-avatar.png";
import { selectCurrentPlan, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import PlanScreen from "../PlanScreen/PlanScreen";
function Profile() {
  const user = useSelector(selectUser);
  console.log(user);

  const currentPlan = useSelector(selectCurrentPlan);
  console.log(currentPlan);
  return (
    <Container>
      <ProfileBody>
        <h1>Edit Profile</h1>
        <ProfileInfo>
          <img src={avatar} alt="" />

          <ProfileDetail>
            <h2>{user.email}</h2>
            <ProfilePlans>
              <h3>Plans {currentPlan && `(${currentPlan?.currentPlan})`}</h3>
              <PlanScreen />
              <button className="signOut" onClick={() => auth.signOut()}>
                Sign Out
              </button>
            </ProfilePlans>
          </ProfileDetail>
        </ProfileInfo>
      </ProfileBody>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  margin-top: 80px;
  background-color: #111;
  height: calc(100vh - 80px);
`;
const ProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  padding-top: 8%;
  max-width: 800px;
  h1 {
    font-size: 60px;
    font-weight: 400;
    border-bottom: 1px solid #282c2d;
    margin-bottom: 20px;
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  img {
    height: 100px;
  }
`;
const ProfileDetail = styled.div`
  margin-left: 25px;
  flex: 1;
  h2 {
    background-color: gray;
    padding: 15px;
    font-size: 15px;
    padding-left: 20px;
  }
`;
const ProfilePlans = styled.div`
  margin-top: 20px;
  h3 {
    border-bottom: 1px solid #282c2d;
    padding-bottom: 10px;
  }
  .signOut {
    cursor: pointer;
    padding: 10px 20px;
    font-size: 1rem;
    margin-top: 5%;
    width: 100%;
    background-color: #e50914;
    border: none;
  }
`;
