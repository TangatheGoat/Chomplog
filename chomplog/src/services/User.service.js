//auther @James
// Mohammed-Huzayl Anwar added user login.

const RegisterUser = async (userName, email, gender, password) => {
  return fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: userName,
      email: email,
      gender: gender,
      password: password,
    }),
  })
    .then((response) => {
      console.log(typeof gender);
      console.log("here!");
      console.log(response);
      if (response.status == 201) {
        return "Registered";
      } else if (response.status === 400) {
        console.log(response.status);
        throw "Email aready used";
      } else {
        console.log(response.status);
        console.log(response);
        return response.json();
      }
    })
    .then((resJson) => {
      console.log(resJson);
      return resJson;
    })

    .catch((error) => {
      console.log("Err:", error);
      return Promise.reject(error);
    });
};

const login = async (email, password) => {
  return fetch(`http://localhost:3000/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) throw new Error("Invalid login credentials.");

      if (response.status == 200) {
        return response.json();
      }
    })
    .then((resJson) => {
      localStorage.setItem("id", resJson.id);
      localStorage.setItem("loginToken", resJson.loginToken);
      return resJson;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const logout = async () => {
  return fetch("http://localhost:3000/logout", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("loginToken"),
    },
  })
    .then((response) => {
      if (response.status == 200) {
        localStorage.removeItem("loginToken");
        localStorage.removeItem("id");
        return "logout";
      } else {
        console.log(response.status);
        console.log(response);
        return response.json();
      }
    })
    .then((resJson) => {
      return resJson;
    })

    .catch((error) => {
      return Promise.reject(error);
    });
};

export const UserService = {
  login,
  logout,
  RegisterUser,
};
