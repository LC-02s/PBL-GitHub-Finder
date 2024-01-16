export default class Finder {
    constructor() {
        this.userState = 0,
        this.reposState = 1,
        this.intlKR = new Intl.NumberFormat('ko-KR', {
            notation: 'compact',
            maximumFractionDigits: 1,
        }),
        this.intlUS = new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 1,
        })
    }

    static async fetchData(username, state) {
        try {
            const userData = await fetch(`https://api.github.com/users/${username + (state ? '/repos' : '')}`);
            const jsonData = await userData.json();
            return jsonData.message ? null : jsonData;
        } catch(err) {
            console.error('fetchData: ', err);
        }
    }

    async printData(username) {
        // method to debug
        console.log('userData: ', await Finder.fetchData(username, this.userState));
        console.log('repoData: ', await Finder.fetchData(username, this.reposState));
    }

    async extractData(username) {
        return ({
            user: await Finder.fetchData(username, this.userState) ?? false,
            repos: await Finder.fetchData(username, this.reposState) ?? false
        });
    }

    async templateHTML(username) {
        const { user, repos } = await this.extractData(username);
        if (user !== false && repos !== false) {
            const detailTarget = {
                company: 'domain',
                email: 'mail',
                location: 'location_on',
                blog: 'article',
                created_at: 'flag',
            };
            const templateHTML = `
            <article class="area-result__wrap">
            <div class="area-result__container">
                <div class="area-result__profileWrap">
                    <div class="area-result__profileImg">
                        <img src="${user.avatar_url ?? ''}" alt="${user.name ?? '유저'} 아바타 이미지">
                        <a href="${user.html_url ?? 'https://github.com/'}" target="_blank" title="새창이동: ${user.name ?? '유저'} GitHub Page"><span>View Profile </span><span class="material-icons">open_in_new</span></a>
                    </div>
                    <div class="area-result__profileName">
                        <h2>${user.name ? user.name : user.login}</h2>
                        ${
                            user.name ? 
                            `<p>${user.login ?? 'userId'}${user.bio ? (' &middot; ' + user.bio) : ''}</p>` : ''
                        }
                    </div>
                    <ul class="area-result__profileSummary" role="list">
                        <li class="area-result__profileSummaryItem" role="listitem">
                            <p>${this.intlKR.format(user.public_repos) ?? 0}</p>
                            <p>저장소</p>
                        </li>
                        <li class="area-result__profileSummaryItem" role="listitem">
                            <p>${this.intlKR.format(user.followers) ?? 0}</p>
                            <p>팔로워</p>
                        </li>
                        <li class="area-result__profileSummaryItem" role="listitem">
                            <p>${this.intlKR.format(user.following) ?? 0}</p>
                            <p>팔로잉</p>
                        </li>
                    </ul>
                    <ul class="area-result__profileDetails" role="list">
                        ${
                        Object
                            .keys(detailTarget)
                            .map(el => {
                                return (user[el] !== null && user[el] !== '') ?
                                    `<li role="listitem">
                                        <p><span class="material-icons">${detailTarget[el]}</span> <span>${user[el]}</span></p>
                                    </li>` : '';
                            }).join('')
                        }
                    </ul>
                </div>
                <div class="area-result__repository">
                    <h3 class="area-result__repositoryTitle">Popular repositories</h3>
                    <ul class="area-result__repositoryList" role="list">
                        ${
                        repos.length > 0 ? repos.map((el, idx) => {
                            return idx < 4 ?
                            `<li class="area-result__repositoryItem" role="listitem">
                                <h3 class="area-result__repositorySubject">
                                    <a href="${el.html_url}" target="_blank" title="새창이동: ${el.name}">${el.name}</a>
                                </h3>
                                ${ el.description !== null ? '<p class="area-result__repositoryDescription">' + el.description + '</p>' : '' }
                                <div class="area-result__repositorySummary">
                                    <p><span class="material-icons">star</span> ${this.intlUS.format(el.stargazers_count) ?? 0}</p>
                                    <p><span class="material-icons">visibility</span> ${this.intlUS.format(el.watchers_count) ?? 0}</p>
                                    <p><span class="material-icons">forklift</span> ${this.intlUS.format(el.forks_count) ?? 0}</p>
                                </div>
                            </li>` : ''
                        }).join('') : '<li class="area-result__repositoryNone"><p>레포지토리가 없습니다</p></li>'
                        }
                    </ul>
                </div>
            </div>
            <div class="area-result__lawnImg">
                <img src="https://ghchart.rshah.org/727E84/${username}" alt="${user.name ?? '유저'} 잔디밭 이미지">
            </div>
            </article>
            `
            return templateHTML;
        } else {
            return `<article class="area-result__none"><p>${username} 유저를 찾을 수 없습니다</p></article>`;
        }
    }
}