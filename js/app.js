class GitHubAPI {
  async getUser(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("사용자를 찾을 수 없습니다.");
    return res.json();
  }
  async getRepos(username) {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated`
    );
    if (!res.ok) throw new Error("레포 정보를 불러올 수 없습니다.");
    return res.json();
  }
}

class UI {
  showProfile(user) {
    document.getElementById("profile").innerHTML = `
      <div class="profile-card">
        <div class="profile-left">
          <img src="${user.avatar_url}" alt="프로필 이미지"><br>
          <a href="${
            user.html_url
          }" target="_blank" class="view-btn">View Profile</a>
        </div>
        <div class="profile-right">
          <div class="badges">
            <span class="badge blue">Public Repos: ${user.public_repos}</span>
            <span class="badge gray">Public Gists: ${user.public_gists}</span>
            <span class="badge green">Followers: ${user.followers}</span>
            <span class="badge teal">Following: ${user.following}</span>
          </div>
          <table class="profile-table">
            <tr><td>Company:</td><td>${user.company || "정보 없음"}</td></tr>
            <tr><td>Website/Blog:</td><td>${
              user.blog
                ? `<a href="${user.blog}" target="_blank">${user.blog}</a>`
                : "정보 없음"
            }</td></tr>
            <tr><td>Location:</td><td>${user.location || "정보 없음"}</td></tr>
            <tr><td>Member Since:</td><td>${new Date(user.created_at)
              .toISOString()
              .slice(0, 10)}</td></tr>
          </table>
        </div>
      </div>
    `;
  }
  showRepos(repos) {
    const repoDiv = document.getElementById("repos");
    if (!repos.length) {
      repoDiv.innerHTML = "";
      return;
    }
    repoDiv.innerHTML = `
      <div class="repos-title">Latest Repos</div>
      <ul class="repo-list">
        ${repos
          .slice(0, 5)
          .map(
            (repo) => `
          <li class="repo-item">
            <a href="${repo.html_url}" target="_blank" class="repo-link">${repo.name}</a>
            <span class="repo-badges">
              <span class="badge blue">Stars: ${repo.stargazers_count}</span>
              <span class="badge gray">Watchers: ${repo.watchers_count}</span>
              <span class="badge green">Forks: ${repo.forks_count}</span>
            </span>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }
  showGrass(username) {
    document.getElementById("grass").innerHTML = `
      <h3>잔디밭</h3>
      <img src="https://ghchart.rshah.org/${username}" alt="잔디밭 그래프" style="max-width:100%;"/>
    `;
  }
  showError(msg) {
    document.getElementById(
      "profile"
    ).innerHTML = `<span style="color:red">${msg}</span>`;
    document.getElementById("repos").innerHTML = "";
    document.getElementById("grass").innerHTML = "";
  }
  clear() {
    document.getElementById("profile").innerHTML = "";
    document.getElementById("repos").innerHTML = "";
    document.getElementById("grass").innerHTML = "";
  }
}

class Spinner {
  show() {
    document.getElementById("spinner").classList.remove("hidden");
  }
  hide() {
    document.getElementById("spinner").classList.add("hidden");
  }
}

class App {
  constructor() {
    this.api = new GitHubAPI();
    this.ui = new UI();
    this.spinner = new Spinner();
    document
      .getElementById("searchBtn")
      .addEventListener("click", () => this.search());
    document
      .getElementById("usernameInput")
      .addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.search();
      });
  }
  async search() {
    const username = document.getElementById("usernameInput").value.trim();
    if (!username) return;
    this.ui.clear();
    this.spinner.show();
    try {
      const user = await this.api.getUser(username);
      this.ui.showProfile(user);
      const repos = await this.api.getRepos(username);
      this.ui.showRepos(repos);
      this.ui.showGrass(username);
    } catch (e) {
      this.ui.showError(e.message);
    }
    this.spinner.hide();
  }
}

window.onload = () => new App();
