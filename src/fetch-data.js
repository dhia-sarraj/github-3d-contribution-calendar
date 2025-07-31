import axios from "axios"
import dotenv from "dotenv";

dotenv.config();

const url = "https://api.github.com/graphql";

export const fetchData = async (username)=>{
    const headers = { Authorization: `bearer ${process.env.GITHUB_TOKEN}` };
    const req = {
        query: `
            query {
                user(login: ${username}) {
                    contributionsCollection {
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
                }
            `
    };

    const response = await axios.post(
        url,
        req,
        { headers: headers }
    );

    return response.data;
};