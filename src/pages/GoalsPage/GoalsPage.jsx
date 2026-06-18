import { useEffect, useState } from "react";
import "./GoalsPage.css";

const defaultGoals = [];

function compressImage(file, maxSize = 280, quality = 0.55) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedImage = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedImage);
      };

      img.onerror = reject;
      img.src = reader.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getSavedGoals() {
  try {
    const savedGoals = localStorage.getItem("lifeHelperGoals");

    if (savedGoals) {
      return JSON.parse(savedGoals);
    }

    return defaultGoals;
  } catch (error) {
    console.log("Could not load goals:", error);
    localStorage.removeItem("lifeHelperGoals");
    return defaultGoals;
  }
}

function getProgress(currentAmount, targetAmount) {
  if (!targetAmount || targetAmount <= 0) {
    return 0;
  }

  return Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
}

function formatMoney(value) {
  return Number(value).toLocaleString("en-GB");
}

export default function GoalsPage() {
  const [goals, setGoals] = useState(getSavedGoals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [addAmount, setAddAmount] = useState("");

  const [newGoal, setNewGoal] = useState({
    title: "",
    currentAmount: "",
    targetAmount: "",
    deadline: "",
    image: "",
    color: "purple",
  });

  useEffect(() => {
    try {
      localStorage.setItem("lifeHelperGoals", JSON.stringify(goals));
    } catch (error) {
      console.log("LocalStorage is full:", error);
      alert(
        "Storage is full. Please use a smaller image or delete old saved goals.",
      );
    }
  }, [goals]);

  async function handleGoalImage(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    try {
      const compressedImage = await compressImage(file, 280, 0.55);

      setNewGoal({
        ...newGoal,
        image: compressedImage,
      });
    } catch (error) {
      console.log("Image error:", error);
      alert("Could not upload this image. Please choose another one.");
    }
  }

  function addNewGoal() {
    if (
      newGoal.title.trim() === "" ||
      newGoal.targetAmount.trim() === "" ||
      newGoal.deadline.trim() === ""
    ) {
      return;
    }

    const targetAmount = Number(newGoal.targetAmount);
    const currentAmount = Number(newGoal.currentAmount) || 0;

    if (targetAmount <= 0) {
      alert("Target amount must be more than 0.");
      return;
    }

    const goalToAdd = {
      id: Date.now(),
      title: newGoal.title,
      currentAmount: currentAmount,
      targetAmount: targetAmount,
      deadline: newGoal.deadline,
      image: newGoal.image,
      color: newGoal.color,
      history: [],
    };

    setGoals([goalToAdd, ...goals]);

    setNewGoal({
      title: "",
      currentAmount: "",
      targetAmount: "",
      deadline: "",
      image: "",
      color: "purple",
    });

    setIsModalOpen(false);
  }

  function addMoneyToGoal() {
    if (!selectedGoal || addAmount.trim() === "") {
      return;
    }

    const amount = Number(addAmount);

    if (amount <= 0) {
      return;
    }

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const updatedGoals = goals.map((goal) => {
      if (goal.id === selectedGoal.id) {
        const updatedGoal = {
          ...goal,
          currentAmount: goal.currentAmount + amount,
          history: [
            {
              id: Date.now(),
              amount: amount,
              date: today,
            },
            ...goal.history,
          ],
        };

        setSelectedGoal(updatedGoal);
        return updatedGoal;
      }

      return goal;
    });

    setGoals(updatedGoals);
    setAddAmount("");
  }

  function deleteGoal(id) {
    setGoals(goals.filter((goal) => goal.id !== id));
    setSelectedGoal(null);
  }

  if (selectedGoal) {
    const progress = getProgress(
      selectedGoal.currentAmount,
      selectedGoal.targetAmount,
    );

    return (
      <main className="goalsPage">
        <header className="goalsHeader">
          <div className="goalsLogo">
            <span>✓</span>
            <p className="goalsLogoText">LifeHelper</p>
          </div>
        </header>

        <section className="goalDetailsTop">
          <button className="backButton" onClick={() => setSelectedGoal(null)}>
            ← Back
          </button>

          <button
            className="deleteGoalButton"
            onClick={() => deleteGoal(selectedGoal.id)}
          >
            Delete
          </button>
        </section>

        <section className={`goalDetailsCard ${selectedGoal.color}Goal`}>
          <div className="goalDetailsImageBox">
            {selectedGoal.image ? (
              <img
                src={selectedGoal.image}
                alt={selectedGoal.title}
                className="goalDetailsImage"
              />
            ) : (
              <span>🎯</span>
            )}
          </div>

          <div className="goalDetailsContent">
            <h1 className="goalDetailsTitle">{selectedGoal.title}</h1>

            <p className="goalDetailsMoney">
              £{formatMoney(selectedGoal.currentAmount)} / £
              {formatMoney(selectedGoal.targetAmount)}
            </p>

            <div className="goalProgressBar">
              <div
                className="goalProgressFill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="goalDetailsMeta">
              <span>{progress}% completed</span>
              <span>Deadline: {selectedGoal.deadline}</span>
            </div>
          </div>
        </section>

        <section className="addMoneyCard">
          <div>
            <h3>Add money</h3>
            <p>Track how much you saved for this goal.</p>
          </div>

          <div className="addMoneyForm">
            <input
              type="number"
              placeholder="£ Amount"
              value={addAmount}
              onChange={(event) => setAddAmount(event.target.value)}
            />

            <button onClick={addMoneyToGoal}>Add</button>
          </div>
        </section>

        <section className="goalHistorySection">
          <h3 className="sectionTitle">Saving History</h3>

          <div className="goalHistoryList">
            {selectedGoal.history.length === 0 ? (
              <div className="emptyHistory">
                <p>No money added yet</p>
                <span>Your saving history will appear here.</span>
              </div>
            ) : (
              selectedGoal.history.map((item) => (
                <div className="historyItem" key={item.id}>
                  <div>
                    <h4>Added money</h4>
                    <p>{item.date}</p>
                  </div>

                  <strong>+ £{formatMoney(item.amount)}</strong>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="goalsPage">
      <header className="goalsHeader">
        <div className="goalsLogo">
          <span>✓</span>
          <p className="goalsLogoText">LifeHelper</p>
        </div>
      </header>

      <section className="goalsTop">
        <div className="goalsTopText">
          <h1 className="goalsTitle">Savings Goals</h1>
          <p className="goalsSubtitle">Plan, save and track your progress</p>
        </div>

        <button className="addGoalButton" onClick={() => setIsModalOpen(true)}>
          + New Goal
        </button>
      </section>

      <section className="goalsList">
        {goals.length === 0 ? (
          <div className="emptyGoals">
            <h3>No goals yet</h3>
            <p>Create your first saving goal to get started.</p>
          </div>
        ) : (
          goals.map((goal) => {
            const progress = getProgress(goal.currentAmount, goal.targetAmount);

            return (
              <button
                key={goal.id}
                className={`goalCard ${goal.color}Goal`}
                onClick={() => setSelectedGoal(goal)}
              >
                <div className="goalImageBox">
                  {goal.image ? (
                    <img src={goal.image} alt={goal.title} />
                  ) : (
                    <span>🎯</span>
                  )}
                </div>

                <div className="goalInfo">
                  <div className="goalTopLine">
                    <h3>{goal.title}</h3>

                    <strong>
                      £{formatMoney(goal.currentAmount)} / £
                      {formatMoney(goal.targetAmount)}
                    </strong>
                  </div>

                  <div className="goalProgressBar">
                    <div
                      className="goalProgressFill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="goalBottomLine">
                    <span>{progress}%</span>
                    <p>Deadline: {goal.deadline}</p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </section>

      {isModalOpen && (
        <div className="goalModalOverlay">
          <div className="goalModal">
            <div className="goalModalHeader">
              <div>
                <h2>Create New Goal</h2>
                <p>Add a saving goal with image and deadline.</p>
              </div>

              <button onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <div className="goalForm">
              <div className="goalField">
                <label>Goal title</label>
                <input
                  type="text"
                  placeholder="Example: iPhone 17 Pro"
                  value={newGoal.title}
                  onChange={(event) =>
                    setNewGoal({ ...newGoal, title: event.target.value })
                  }
                />
              </div>

              <div className="goalMoneyGrid">
                <div className="goalField">
                  <label>Current amount</label>
                  <input
                    type="number"
                    placeholder="£0"
                    value={newGoal.currentAmount}
                    onChange={(event) =>
                      setNewGoal({
                        ...newGoal,
                        currentAmount: event.target.value,
                      })
                    }
                  />
                </div>

                <div className="goalField">
                  <label>Target amount</label>
                  <input
                    type="number"
                    placeholder="£1500"
                    value={newGoal.targetAmount}
                    onChange={(event) =>
                      setNewGoal({
                        ...newGoal,
                        targetAmount: event.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="goalField">
                <label>Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(event) =>
                    setNewGoal({ ...newGoal, deadline: event.target.value })
                  }
                />
              </div>

              <div className="goalField">
                <label>Goal image</label>

                <label className="goalImageUpload">
                  {newGoal.image ? (
                    <img src={newGoal.image} alt="Goal preview" />
                  ) : (
                    <span>+ Add image</span>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGoalImage}
                  />
                </label>
              </div>

              <div className="goalField">
                <label>Card color</label>

                <div className="goalColorOptions">
                  {["purple", "orange", "green", "blue"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={
                        newGoal.color === color
                          ? `goalColor ${color}Color activeGoalColor`
                          : `goalColor ${color}Color`
                      }
                      onClick={() => setNewGoal({ ...newGoal, color })}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="goalModalActions">
                <button
                  className="cancelGoalButton"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button className="saveGoalButton" onClick={addNewGoal}>
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
