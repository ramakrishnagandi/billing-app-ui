export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(user.accessToken);

    if (user && user.accessToken) {
        console.log("Token", user.accessToken);
        return { "Authorization": 'Bearer ' + user.accessToken };
    } else {
        return { "xyz": "rama" };
    }
}