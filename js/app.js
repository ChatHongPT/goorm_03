const CONFIG = {
  MAX_REPOS: 5,
  GITHUB_CHART_URL: "https://ghchart.rshah.org",
  ANIMATION_DELAY: 300,
};

const ERRORS = {
  USER_NOT_FOUND: "🔍 사용자를 찾을 수 없습니다. 다른 사용자명을 시도해보세요.",
  REPOS_ERROR: "📁 저장소 정보를 불러오는데 실패했습니다.",
  NETWORK_ERROR: "🌐 네트워크 연결을 확인해주세요.",
  EMPTY_INPUT: "📝 GitHub 사용자명을 입력해주세요.",
};

class GitHubAPI {
  async getUser(username) {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (res.status === 404) {
        throw new Error(ERRORS.USER_NOT_FOUND);
      }
      if (!res.ok) {
        throw new Error(ERRORS.NETWORK_ERROR);
      }
      return await res.json();
    } catch (error) {
      if (error.message.includes("fetch")) {
        throw new Error(ERRORS.NETWORK_ERROR);
      }
      throw error;
    }
  }

  async getRepos(username) {
    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=${CONFIG.MAX_REPOS}`
      );
      if (!res.ok) {
        throw new Error(ERRORS.REPOS_ERROR);
      }
      return await res.json();
    } catch (error) {
      console.warn("저장소 정보 로드 실패:", error);
      return [];
    }
  }
}

class UI {
  showProfile(user) {
    const profileElement = document.getElementById("profile");

    profileElement.style.opacity = "0";

    setTimeout(() => {
      profileElement.innerHTML = this.generateProfileHTML(user);
      profileElement.style.opacity = "1";
    }, CONFIG.ANIMATION_DELAY);
  }

  generateProfileHTML(user) {
    const memberSince = new Date(user.created_at).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formatBlog = (blog) => {
      if (!blog) return "정보 없음";
      const url = blog.startsWith("http") ? blog : `https://${blog}`;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${blog}</a>`;
    };

    return `
      <div class="profile-card">
        <div class="profile-left">
          <img src="${user.avatar_url}" alt="${
      user.name || user.login
    }의 프로필 이미지" loading="lazy">
          <a href="${
            user.html_url
          }" target="_blank" rel="noopener noreferrer" class="view-btn">
            <i class="fab fa-github"></i>
            View Profile
          </a>
          ${
            user.name
              ? `<h2 class="user-name">${this.escapeHtml(user.name)}</h2>`
              : ""
          }
          <p class="username">@${user.login}</p>
          ${
            user.bio
              ? `<p class="user-bio">${this.escapeHtml(user.bio)}</p>`
              : ""
          }
        </div>
        <div class="profile-right">
          <div class="badges">
            <span class="badge blue" title="공개 저장소">
              <i class="fas fa-book"></i>
              Public Repos: ${this.formatNumber(user.public_repos)}
            </span>
            <span class="badge gray" title="공개 Gist">
              <i class="fas fa-code"></i>
              Public Gists: ${this.formatNumber(user.public_gists)}
            </span>
            <span class="badge green" title="팔로워">
              <i class="fas fa-users"></i>
              Followers: ${this.formatNumber(user.followers)}
            </span>
            <span class="badge teal" title="팔로잉">
              <i class="fas fa-user-plus"></i>
              Following: ${this.formatNumber(user.following)}
            </span>
          </div>
          <table class="profile-table">
            <tr>
              <td><i class="fas fa-building"></i> Company:</td>
              <td>${
                user.company ? this.escapeHtml(user.company) : "정보 없음"
              }</td>
            </tr>
            <tr>
              <td><i class="fas fa-globe"></i> Website/Blog:</td>
              <td>${formatBlog(user.blog)}</td>
            </tr>
            <tr>
              <td><i class="fas fa-map-marker-alt"></i> Location:</td>
              <td>${
                user.location ? this.escapeHtml(user.location) : "정보 없음"
              }</td>
            </tr>
            <tr>
              <td><i class="fas fa-calendar-alt"></i> Member Since:</td>
              <td>${memberSince}</td>
            </tr>
          </table>
        </div>
      </div>
    `;
  }

  showRepos(repos) {
    const repoDiv = document.getElementById("repos");

    if (!repos || !repos.length) {
      repoDiv.innerHTML = this.generateEmptyReposHTML();
      return;
    }

    // 포크가 아닌 저장소만 필터링하고 정렬
    const filteredRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, CONFIG.MAX_REPOS);

    repoDiv.style.opacity = "0";

    setTimeout(() => {
      repoDiv.innerHTML = this.generateReposHTML(filteredRepos);
      repoDiv.style.opacity = "1";
    }, CONFIG.ANIMATION_DELAY);
  }

  generateEmptyReposHTML() {
    return `
      <div class="repos-empty">
        <i class="fas fa-folder-open"></i>
        <p>표시할 저장소가 없습니다.</p>
      </div>
    `;
  }

  generateReposHTML(repos) {
    if (!repos.length) return this.generateEmptyReposHTML();

    return `
      <div class="repos-title">
        <i class="fas fa-folder"></i>
        Latest Repositories
      </div>
      <ul class="repo-list">
        ${repos.map((repo) => this.generateRepoItemHTML(repo)).join("")}
      </ul>
    `;
  }

  generateRepoItemHTML(repo) {
    const updatedAt = new Date(repo.updated_at).toLocaleDateString("ko-KR");
    const language = repo.language
      ? `<span class="repo-language" style="color: ${this.getLanguageColor(
          repo.language
        )}">${repo.language}</span>`
      : "";

    return `
      <li class="repo-item">
        <div class="repo-header">
          <a href="${
            repo.html_url
          }" target="_blank" rel="noopener noreferrer" class="repo-link">
            <i class="fas fa-book"></i>
            ${repo.name}
          </a>
          ${language}
        </div>
        ${
          repo.description
            ? `<p class="repo-description">${this.escapeHtml(
                repo.description
              )}</p>`
            : ""
        }
        <div class="repo-meta">
          <span class="repo-updated">
            <i class="fas fa-clock"></i>
            Updated ${updatedAt}
          </span>
        </div>
        <div class="repo-badges">
          <span class="badge blue" title="스타">
            <i class="fas fa-star"></i>
            ${this.formatNumber(repo.stargazers_count)}
          </span>
          <span class="badge gray" title="워처">
            <i class="fas fa-eye"></i>
            ${this.formatNumber(repo.watchers_count)}
          </span>
          <span class="badge green" title="포크">
            <i class="fas fa-code-branch"></i>
            ${this.formatNumber(repo.forks_count)}
          </span>
          ${
            repo.license
              ? `
            <span class="badge teal" title="라이선스">
              <i class="fas fa-balance-scale"></i>
              ${repo.license.name}
            </span>
          `
              : ""
          }
        </div>
      </li>
    `;
  }

  showGrass(username) {
    const grassElement = document.getElementById("grass");
    grassElement.style.opacity = "0";

    setTimeout(() => {
      grassElement.innerHTML = `
        <div class="grass-title">
          <i class="fas fa-chart-line"></i>
          <h3>Contribution Graph</h3>
        </div>
        <div class="grass-container">
          <img 
            src="${CONFIG.GITHUB_CHART_URL}/${username}" 
            alt="${username}의 GitHub 기여도 그래프" 
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          />
          <div class="grass-error" style="display: none;">
            <i class="fas fa-exclamation-triangle"></i>
            <p>기여도 그래프를 불러올 수 없습니다.</p>
          </div>
        </div>
      `;
      grassElement.style.opacity = "1";
    }, CONFIG.ANIMATION_DELAY);
  }

  showError(msg) {
    const profileElement = document.getElementById("profile");
    profileElement.innerHTML = `
      <div class="error-container">
        <div class="error-icon">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <p class="error-message">${msg}</p>
        <button class="retry-btn" onclick="app.clearAndFocus()">
          <i class="fas fa-redo"></i>
          다시 시도
        </button>
      </div>
    `;
    this.clear(["repos", "grass"]);
  }

  clear(sections = ["profile", "repos", "grass"]) {
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        element.innerHTML = "";
      }
    });
  }

  formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  getLanguageColor(language) {
    const colors = {
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      Java: "#b07219",
      TypeScript: "#2b7489",
      "C++": "#f34b7d",
      C: "#555555",
      HTML: "#e34c26",
      CSS: "#563d7c",
      PHP: "#4F5D95",
      Go: "#00ADD8",
      Rust: "#dea584",
      Swift: "#ffac45",
    };
    return colors[language] || "#586069";
  }
}

class Spinner {
  constructor() {
    this.element = document.getElementById("spinner");
  }

  show() {
    if (this.element) {
      this.element.classList.remove("hidden");
    }
  }

  hide() {
    if (this.element) {
      this.element.classList.add("hidden");
    }
  }
}

class App {
  constructor() {
    this.api = new GitHubAPI();
    this.ui = new UI();
    this.spinner = new Spinner();
    this.currentUsername = "";

    this.initializeEventListeners();

    window.app = this;

    console.log("🚀 GitHub Finder 앱이 로드되었습니다!");
  }

  initializeEventListeners() {
    const searchBtn = document.getElementById("searchBtn");
    const usernameInput = document.getElementById("usernameInput");

    if (searchBtn) {
      searchBtn.addEventListener("click", () => this.handleSearch());
    }

    if (usernameInput) {
      usernameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.handleSearch();
        }
      });

      usernameInput.addEventListener("focus", () => {
        usernameInput.parentElement?.classList.add("focused");
      });

      usernameInput.addEventListener("blur", () => {
        usernameInput.parentElement?.classList.remove("focused");
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.clearAndFocus();
      }
    });
  }

  handleSearch() {
    const usernameInput = document.getElementById("usernameInput");
    const username = usernameInput?.value.trim();

    if (!username) {
      this.ui.showError(ERRORS.EMPTY_INPUT);
      this.focusInput();
      return;
    }

    if (username === this.currentUsername) {
      return;
    }

    this.search(username);
  }

  async search(username) {
    this.currentUsername = username;
    this.ui.clear();
    this.spinner.show();

    try {
      // 사용자 정보 먼저 가져오기
      const user = await this.api.getUser(username);
      this.ui.showProfile(user);

      // 저장소 정보와 잔디밭은 병렬로 처리
      const [repos] = await Promise.all([this.api.getRepos(username)]);

      this.ui.showRepos(repos);
      this.ui.showGrass(username);

      console.log(`✅ "${username}" 검색 완료`);
    } catch (error) {
      console.error("❌ 검색 오류:", error);
      this.ui.showError(error.message);
      this.currentUsername = "";
    } finally {
      this.spinner.hide();
    }
  }

  focusInput() {
    const input = document.getElementById("usernameInput");
    if (input) {
      input.focus();
      input.select();
    }
  }

  clearAndFocus() {
    const input = document.getElementById("usernameInput");
    if (input) {
      input.value = "";
    }
    this.currentUsername = "";
    this.ui.clear();
    this.focusInput();
  }

  getAppInfo() {
    return {
      version: "2.0.0",
      currentUser: this.currentUsername,
      features: [
        "🔍 GitHub 사용자 검색",
        "📊 프로필 정보 표시",
        "📁 저장소 목록",
        "🌱 기여도 그래프",
        "🎨 반응형 디자인",
      ],
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});

window.addEventListener("load", () => {
  if (!window.app) {
    new App();
  }
});
