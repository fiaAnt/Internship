import { IHATEOASLinks, IScooter } from "./models/Scooter";

const createHATEOASLinks = (scooter: IScooter, baseUrl: string = ''): IHATEOASLinks => {
    const links: IHATEOASLinks = {
        self: { href: `${baseUrl}/scooters/${scooter.ssn}`, method: 'GET' }
    };
    if (scooter.currentRun?.driverId) {
        links.driver = {
            href: `${baseUrl}/drivers/${scooter.currentRun.driverId}`,
            method: 'GET'
        };
    }

    return links;
};

export default createHATEOASLinks