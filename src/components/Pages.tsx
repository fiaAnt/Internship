import React from 'react';
import { loremIpsum } from 'lorem-ipsum';

const Page: React.FC<{ title: string }> = ({ title }) => (
  <>
    <h3>{title}</h3>
    <div>
      <p> {loremIpsum({ count: 5 })}</p>
      <p> {loremIpsum({ count: 3 })}</p>
    </div>
  </>
);

export const HomePage = () => <Page title="Home" />;
export const BreakingNewsPage = () => <Page title="Breaking News" />;
export const WorldNewsPage = () => <Page title="World News" />;
export const CompanyPage = () => <Page title="Company" />;
export const TeamPage = () => <Page title="Team" />;
export const ContactPage = () => <Page title="Contact Us" />;
