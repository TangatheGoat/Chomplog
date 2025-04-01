//auther @James

const RegisterUser = (userName, email, password) => {
  return fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: userName,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
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
  const response = await fetch(`http://localhost:5173/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Invalid login credentials.");
      return response.json();
    })
    .then((resJson) => {
      localStorage.setItem("user_id", resJson.user_id);
      localStorage.setItem("session_token", resJson.session_token);
      return resJson;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const logout = () => {
  return fetch("http://localhost:3000/logout", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("session_token"),
    },
  })
    .then((response) => {
      if (response.status == 200) {
        localStorage.removeItem("session_token");
        localStorage.removeItem("user_id");
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
