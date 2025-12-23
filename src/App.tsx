import type { Option } from './Dropdown';
import Dropdown from './Dropdown';

const App: React.FC = () => {
  const options: Option[] = [
    { id: 'option-1', value: 'Option 1' },
    { id: 'option-2', value: 'Option 2' },
    { id: 'option-3', value: 'Option 3' },
    { id: 'option-4', value: 'Option 4' },
  ];
  const handleDropdownChange = (value: string) => {
    console.log('Selected value:', value);
  };

  return (
    <div>
      <Dropdown options={options} onChange={handleDropdownChange} />
    </div>
  );
};

export default App;
