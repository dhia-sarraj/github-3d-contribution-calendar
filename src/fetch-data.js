import axios from "axios"
import dotenv from "dotenv";

dotenv.config();

const url = "https://api.github.com/graphql";

export const fetchData = async (username)=>{
    const headers = { Authorization: `bearer ${process.env.GITHUB_TOKEN}` };
    const to_date   = new Date();
    const from_date = new Date();
    from_date.setDate(to_date.getDate() - 30);
    const req = {
        query: `
        query($login:String!, $from:DateTime!, $to:DateTime!) {
            user(login:$login) {
                starredRepositories {
                    totalCount 
                }
                repositories(first: 100, isFork: true, ownerAffiliations: OWNER) {
                    totalCount
                }
                contributionsCollection(from:$from, to:$to) {
                    contributionCalendar {
                        totalContributions
                        weeks {
                        contributionDays {
                            contributionCount
                            date
                            weekday
                        }
                        }
                    }
                    commitContributionsByRepository(maxRepositories: 100) {
                        contributions(first: 100) {
                            nodes {
                                occurredAt
                                commitCount
                            }
                        }
                    }
                    issueContributions(first: 100) {
                        nodes {
                            occurredAt
                        }
                    }
                    pullRequestContributions(first: 100) {
                        nodes {
                            occurredAt
                        }
                    }
                    pullRequestReviewContributions(first: 100) {
                        nodes {
                            occurredAt
                        }
                    }
                    repositoryContributions(first: 100) {
                        nodes {
                            occurredAt
                        }
                    }
                }
            }
        }`,
        variables: {
            login: username,
            from:  from_date.toISOString(),
            to:    to_date.toISOString()
        }
    };

    const response = await axios.post(
        url,
        req,
        { headers: headers }
    );

    return response.data;
};