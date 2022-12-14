import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const vaccinations = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.words(2),
  label: faker.lorem.words(4),
  scheduledDate: faker.date.future(),
  completedDate: sample([faker.date.past(), '']),
  status: sample(['pending', 'completed']),
}));

export default vaccinations;
