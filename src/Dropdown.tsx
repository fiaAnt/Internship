import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './index.css';

export interface Option {
  id: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const selectedIndex = useMemo(() => {
    return selectedOption
      ? options.findIndex((opt) => opt.id === selectedOption.id)
      : -1;
  }, [selectedOption, options]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (isOpen && listboxRef.current && focusedIndex >= 0) {
      const active = listboxRef.current.querySelector(
        `[data-index="${focusedIndex}"]`
      ) as HTMLElement;

      if (active) active.focus();
    }
  }, [focusedIndex, isOpen]);

  const handleSelect = useCallback(
    (option: Option) => {
      setSelectedOption(option);
      onChange?.(option.value);
      setIsOpen(false);
      setFocusedIndex(-1);
    },
    [onChange]
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const open = !prev;

      if (open) {
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      } else {
        setFocusedIndex(-1);
      }

      return open;
    });
  }, [selectedIndex]);

  const handleEnterOrSpace = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (!isOpen) {
        handleToggle();
      } else if (focusedIndex >= 0) {
        handleSelect(options[focusedIndex]);
      }
    },
    [isOpen, focusedIndex, options, handleToggle, handleSelect]
  );

  const handleEscape = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  const handleArrowUp = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(
          selectedIndex >= 0 ? selectedIndex : options.length - 1
        );
      } else {
        setFocusedIndex(
          focusedIndex <= 0 ? options.length - 1 : focusedIndex - 1
        );
      }
    },
    [isOpen, focusedIndex, selectedIndex, options.length]
  );

  const handleArrowDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      } else {
        setFocusedIndex((focusedIndex + 1) % options.length);
      }
    },
    [isOpen, focusedIndex, selectedIndex, options.length]
  );

  const handleHome = useCallback(
    (e: KeyboardEvent) => {
      if (isOpen) {
        e.preventDefault();
        setFocusedIndex(0);
      }
    },
    [isOpen]
  );

  const handleEnd = useCallback(
    (e: KeyboardEvent) => {
      if (isOpen) {
        e.preventDefault();
        setFocusedIndex(options.length - 1);
      }
    },
    [isOpen, options.length]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          handleEnterOrSpace(e as unknown as KeyboardEvent);
          break;
        case 'Escape':
          handleEscape();
          break;
        case 'ArrowUp':
          handleArrowUp(e as unknown as KeyboardEvent);
          break;
        case 'ArrowDown':
          handleArrowDown(e as unknown as KeyboardEvent);
          break;
        case 'Home':
          handleHome(e as unknown as KeyboardEvent);
          break;
        case 'End':
          handleEnd(e as unknown as KeyboardEvent);
          break;
      }
    },
    [
      handleEnterOrSpace,
      handleEscape,
      handleArrowUp,
      handleArrowDown,
      handleHome,
      handleEnd,
    ]
  );

  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <label id="dropdownLabel">choose option</label>
      <button
        type="button"
        id="dropdownButton"
        aria-labelledby="dropdownLabel dropdownButton"
        aria-expanded={isOpen}
        aria-controls="dropdownListbox"
        aria-haspopup="listbox"
        aria-activedescendant={
          focusedIndex >= 0 ? `option-${options[focusedIndex].id}` : undefined
        }
        onClick={handleToggle}
        className="dropdown-button"
      >
        <span>
          {selectedOption ? selectedOption.value : 'choose an option'}
        </span>
        <span aria-hidden="true">{isOpen ? '^' : 'v'}</span>
      </button>

      {isOpen && (
        <ul
          id="dropdownListbox"
          role="listbox"
          ref={listboxRef}
          tabIndex={-1}
          aria-activedescendant={
            focusedIndex >= 0 ? `option-${options[focusedIndex].id}` : undefined
          }
          className="dropdown-listbox"
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              id={`option-${option.id}`}
              data-index={index}
              role="option"
              aria-selected={selectedOption?.id === option.id}
              tabIndex={focusedIndex === index ? 0 : -1}
              className={`dropdown-option ${
                focusedIndex === index ? 'focused' : ''
              } ${selectedOption?.id === option.id ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
