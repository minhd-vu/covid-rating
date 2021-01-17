
import { Fragment } from "react";

export default function About() {
    return (
        <Fragment>
            <h3>What is Covid-Rating?</h3>
            <p>Covid-Rating allows users to rate places based on their covid safety and prevention rating. A higher rating will mean that the location has better covid prevention practices.</p>
            <h3>Covid Resources</h3>
            <ul>
                <li>
                    <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">Center for Disease Control and Prevention</a>
                </li>
                <li>
                    <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">World Health Organization</a>
                </li>
                <li>
                    <a href="https://www.huschblackwell.com/state-by-state-covid-19-guidance">State by State Guidelines</a>
                </li>
            </ul>
            <h3>Built With</h3>
            <ul>
                <li>MongoDB</li>
                <li>Express</li>
                <li>React</li>
                <li>Node</li>
                <li>Mapbox</li>
            </ul>
        </Fragment>
    );
}