import { useState } from 'react';
import { api } from '../lib/api.js';
import { useApi } from '../lib/useApi.js';
import { useRouter } from '../lib/router.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Tabs from '../components/Tabs.jsx';
import Photo from '../components/Photo.jsx';
import Dialog from '../components/Dialog.jsx';
import { SnapshotNotice, Loading, EmptyState } from '../components/Status.jsx';

const TEAMS = {
  leadership: { kind: 'board', title: 'Board of Directors', intro: 'The Board of Directors are responsible for the policy direction of the company.' },
  executives: { kind: 'executives', title: 'Executive Team', intro: 'The executive team responsible for the management of NTHC Limited.' },
  'group-team': { kind: 'group', title: 'Group Business Team', intro: 'Group heads and the managing directors of NTHC’s subsidiary companies.' },
};

export default function Leadership() {
  const { route } = useRouter();
  const team = TEAMS[route] ?? TEAMS.leadership;
  const people = useApi(() => api.people(team.kind), [team.kind]);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PageHeader title={team.title} intro={team.intro} trail={[{ label: 'About', to: 'about' }]} />
      <section className="section">
        <div className="container">
          <Tabs label="Leadership" current={route in TEAMS ? route : 'leadership'}
            items={Object.entries(TEAMS).map(([to, item]) => ({ to, label: item.title }))} />
          <SnapshotNotice source={people.source} />
          {people.loading && <Loading />}
          {!people.loading && people.data.length === 0 && <EmptyState title="Profiles will be published soon" />}
          <ul className="people">
            {people.data.map((person) => (
              <li key={person.name} className="person">
                <div className="person__photo"><Photo src={person.image} alt={person.name} portraitOf={person.name} /></div>
                <h3>{person.name}</h3>
                <p>{person.position}</p>
                {person.profile && <button type="button" onClick={() => setSelected(person)}>Read profile</button>}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Dialog open={Boolean(selected)} title={selected?.name} onClose={() => setSelected(null)}>
        {selected && (
          <div className="profile">
            <div className="person__photo"><Photo src={selected.image} alt={selected.name} portraitOf={selected.name} /></div>
            <div>
              <p className="profile__role">{selected.position}</p>
              <p className="profile__text">{selected.profile}</p>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
