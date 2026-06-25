import { useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage({ profileData, setProfileData }) {
  const imagePath = import.meta.env.BASE_URL;

  const [selectedTheme, setSelectedTheme] = useState("Dark");
  const [activeModal, setActiveModal] = useState(null);

  const avatar = profileData.avatar;
  const userInfo = profileData;

  function changeAvatar(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfileData({
        ...profileData,
        avatar: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  function closeModal() {
    setActiveModal(null);
  }

  const isProfileEmpty =
    userInfo.name.trim() === "" &&
    userInfo.username.trim() === "" &&
    userInfo.birthDate.trim() === "" &&
    userInfo.bio.trim() === "" &&
    avatar === "";

  const completedFields = [
    avatar !== "",
    userInfo.name.trim() !== "",
    userInfo.username.trim() !== "",
    userInfo.birthDate.trim() !== "",
    userInfo.bio.trim() !== "",
  ].filter(Boolean).length;

  const profileCompletion = Math.round((completedFields / 5) * 100);

  return (
    <main className="profilePage">
      <header className="profileHeader">
        <div className="profileLogo">
          <span>✓</span>
          <p className="profileLogoText">LifeHelper</p>
        </div>
      </header>

      <section className="userCard">
        <label className="avatarWrapper">
          {avatar ? (
            <img src={avatar} alt="User avatar" className="profileAvatar" />
          ) : (
            <div className="emptyAvatar">
              <span>+</span>
            </div>
          )}

          <span className="avatarEdit">{avatar ? "Change" : "Add photo"}</span>

          <input
            type="file"
            accept="image/*"
            className="avatarInput"
            onChange={changeAvatar}
          />
        </label>

        <div className="userInfo">
          {isProfileEmpty ? (
            <>
              <h2 className="userFullName">Set up your profile</h2>
              <p className="userBio">
                Add your name, photo and personal details.
              </p>
            </>
          ) : (
            <>
              <h2 className="userFullName">
                {userInfo.name || "No name added"}
              </h2>

              <div className="userDetails">
                <span className="userDetailItem">
                  {userInfo.username || "@username"}
                </span>

                {userInfo.birthDate && (
                  <span className="userDetailItem">
                    Born: {userInfo.birthDate}
                  </span>
                )}
              </div>

              <p className="userBio">{userInfo.bio || "No bio added yet."}</p>
            </>
          )}
        </div>
      </section>

      {profileCompletion < 100 && (
        <section className="profileCompletionCard">
          <div className="completionTop">
            <div>
              <h3>Complete Profile</h3>
              <p>Add photo, name, username, date of birth and bio.</p>
            </div>

            <span>{profileCompletion}%</span>
          </div>

          <div className="completionBar">
            <div
              className="completionProgress"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
        </section>
      )}

      <section className="profileOptions">
        <button
          className="profileOption"
          onClick={() => setActiveModal("personal")}
        >
          <div className="optionLeft">
            <span className="optionIcon">👤</span>
            <p>Personal Information</p>
          </div>

          <span className="optionArrow">›</span>
        </button>

        <button
          className="profileOption"
          onClick={() => setActiveModal("appearance")}
        >
          <div className="optionLeft">
            <span className="optionIcon">◐</span>
            <p>Appearance</p>
          </div>

          <span className="optionSideText">{selectedTheme}</span>
        </button>

        <button
          className="profileOption"
          onClick={() => setActiveModal("about")}
        >
          <div className="optionLeft">
            <span className="optionIcon">ⓘ</span>
            <p>About LifeHelper</p>
          </div>

          <span className="optionArrow">›</span>
        </button>

        <button
          className="profileOption"
          onClick={() => setActiveModal("privacy")}
        >
          <div className="optionLeft">
            <span className="optionIcon">🔒</span>
            <p>Data & Privacy</p>
          </div>

          <span className="optionArrow">›</span>
        </button>

        <button className="profileOption logoutOption">
          <div className="optionLeft">
            <span className="optionIcon">↪</span>
            <p>Log Out</p>
          </div>

          <span className="optionArrow">›</span>
        </button>
      </section>

      <section className="profileMascotCard">
        <div className="mascotText">
          <h3>Keep going!</h3>
          <p>
            Stay focused, complete your tasks and build your future step by
            step.
          </p>
        </div>

        <img
          src={`${imagePath}leclerc.png`}
          alt="LifeHelper mascot"
          className="profileMascotImage"
        />
      </section>

      {activeModal === "personal" && (
        <div className="profileModalOverlay">
          <div className="profileModal">
            <div className="modalHeader">
              <div>
                <h2 className="modalTitle">Personal Information</h2>
                <p className="modalSubtitle">
                  Add or update your profile details.
                </p>
              </div>

              <button className="modalCloseButton" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="profileForm">
              <div className="profileField">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userInfo.name}
                  onChange={(event) =>
                    setProfileData({
                      ...profileData,
                      name: event.target.value,
                    })
                  }
                />
              </div>

              <div className="profileField">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={userInfo.username}
                  onChange={(event) =>
                    setProfileData({
                      ...profileData,
                      username: event.target.value,
                    })
                  }
                />
              </div>

              <div className="profileField">
                <label>Date of birth</label>
                <input
                  type="date"
                  value={userInfo.birthDate}
                  onChange={(event) =>
                    setProfileData({
                      ...profileData,
                      birthDate: event.target.value,
                    })
                  }
                />
              </div>

              <div className="profileField">
                <label>Bio</label>
                <textarea
                  placeholder="Write something about yourself"
                  value={userInfo.bio}
                  onChange={(event) =>
                    setProfileData({
                      ...profileData,
                      bio: event.target.value,
                    })
                  }
                />
              </div>

              <button className="saveProfileButton" onClick={closeModal}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "about" && (
        <div className="profileModalOverlay">
          <div className="profileModal">
            <div className="modalHeader">
              <div>
                <h2 className="modalTitle">About LifeHelper</h2>
                <p className="modalSubtitle">
                  App information and project details.
                </p>
              </div>

              <button className="modalCloseButton" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="infoBox">
              <h3>What is LifeHelper?</h3>
              <p>
                LifeHelper is a productivity app that helps users manage tasks,
                notes, budget, goals and daily progress in one place.
              </p>

              <h3>App Information</h3>

              <div className="appInfoList">
                <div className="appInfoItem">
                  <span>Version</span>
                  <strong>1.0</strong>
                </div>

                <div className="appInfoItem">
                  <span>Created by</span>
                  <strong>Anatolii</strong>
                </div>

                <div className="appInfoItem">
                  <span>Project type</span>
                  <strong>FRONT-END DEVELOPMENT</strong>
                </div>

                <div className="appInfoItem">
                  <span>Main features</span>
                  <strong>Tasks, Notes, Budget, Goals</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "appearance" && (
        <div className="profileModalOverlay">
          <div className="profileModal">
            <div className="modalHeader">
              <div>
                <h2 className="modalTitle">Appearance</h2>
                <p className="modalSubtitle">
                  Choose how LifeHelper should look.
                </p>
              </div>

              <button className="modalCloseButton" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="themePreviewList">
              {["Dark", "Light", "System"].map((theme) => (
                <button
                  key={theme}
                  className={
                    selectedTheme === theme
                      ? "themePreview activeThemePreview"
                      : "themePreview"
                  }
                  onClick={() => setSelectedTheme(theme)}
                >
                  <div className={`themeMockup ${theme.toLowerCase()}Mockup`}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div>
                    <h3>{theme} Mode</h3>
                    <p>
                      {theme === "Dark" && "Dark interface for daily use."}
                      {theme === "Light" &&
                        "Light interface mockup for future update."}
                      {theme === "System" && "Use device appearance settings."}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === "privacy" && (
        <div className="profileModalOverlay">
          <div className="profileModal">
            <div className="modalHeader">
              <div>
                <h2 className="modalTitle">Data & Privacy</h2>
                <p className="modalSubtitle">
                  Short information about user data.
                </p>
              </div>

              <button className="modalCloseButton" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="infoBox">
              <h3>Your personal data</h3>
              <p>
                Your profile information is saved in your browser using
                localStorage. It is used only to personalise your experience
                inside LifeHelper.
              </p>

              <h3>User control</h3>
              <p>
                You can edit your profile details, change your avatar and update
                your personal information at any time.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}