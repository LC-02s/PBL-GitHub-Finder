export default class Finder {
    constructor() {
        this.userState = 0,
        this.reposState = 1
    }

    static async fetchData(username, state) {
        const userData = await fetch(`https://api.github.com/users/${username + (state ? '/repos' : '')}`);
        const jsonData = await userData.json();
        return jsonData;
    }

    async printData(username) {
        // method to debug
        console.log('userData: ', await Finder.fetchData(username, this.userState));
        console.log('repoData: ', await Finder.fetchData(username, this.reposState));
    }

    async returnData(username) {
        return ({
            user: await Finder.fetchData(username, this.userState),
            repos: await Finder.fetchData(username, this.reposState)
        });
    }
}