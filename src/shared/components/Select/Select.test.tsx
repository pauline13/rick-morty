import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Select, type Option } from './Select';

vi.mock('@/shared/assets', () => ({
  ArrowDownIcon: () => <div data-testid="arrow-icon">▼</div>,
}));

const mockOptions: Option<'option1' | 'option2' | 'option3'>[] = [
  { label: 'First Option', value: 'option1' },
  { label: 'Second Option', value: 'option2' },
  { label: 'Third Option', value: 'option3' },
];

describe('renders', () => {
  it('displays placeholder when no option is selected', () => {
    const onChange = vi.fn();
    render(
      <Select
        options={mockOptions}
        value=""
        onChange={onChange}
        placeholder="Choose an option"
      />
    );

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('displays selected option label', () => {
    const onChange = vi.fn();
    render(
      <Select
        options={mockOptions}
        value="option2"
        onChange={onChange}
      />
    );

    expect(screen.getByText('Second Option')).toBeInTheDocument();
  });
});

describe('interactions', () => {
  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select
        options={mockOptions}
        value="option1"
        onChange={onChange}
      />
    );

    const selectButton = screen.getByText('First Option').closest('div');
    await user.click(selectButton!);

    expect(screen.getByText('Second Option')).toBeInTheDocument();
  });

  it('closes dropdown when option is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { rerender } = render(
      <Select
        options={mockOptions}
        value="option1"
        onChange={onChange}
      />
    );

    const selectButton = screen.getByText('First Option').closest('div');
    await user.click(selectButton!);

    const secondOption = screen.getByText('Second Option');
    await user.click(secondOption);

    expect(onChange).toHaveBeenCalledWith('option2');
    rerender(
      <Select
        options={mockOptions}
        value="option2"
        onChange={onChange}
      />
    );

    expect(screen.queryByText('Third Option')).not.toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <div>
        <Select
          options={mockOptions}
          value="option1"
          onChange={onChange}
        />
        <div data-testid="outside">Outside element</div>
      </div>
    );

    const selectButton = screen.getByText('First Option').closest('div');
    await user.click(selectButton!);

    expect(screen.getByText('Second Option')).toBeInTheDocument();

    const outsideElement = screen.getByTestId('outside');
    await user.click(outsideElement);

    expect(screen.queryByText('Second Option')).not.toBeInTheDocument();
  });
});

describe('states', () => {
  it('does not open dropdown when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select
        options={mockOptions}
        value="option1"
        onChange={onChange}
        disabled
      />
    );

    const selectButton = screen.getByText('First Option').closest('div');
    await user.click(selectButton!);

    expect(screen.queryByText('Second Option')).not.toBeInTheDocument();
  });

  it('does not open dropdown when readOnly', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select
        options={mockOptions}
        value="option1"
        onChange={onChange}
        readOnly
      />
    );

    const selectButton = screen.getByText('First Option').closest('div');
    await user.click(selectButton!);

    expect(screen.queryByText('Second Option')).not.toBeInTheDocument();
  });

  it('applies correct size class', () => {
    const onChange = vi.fn();

    const { container: containerXL } = render(
      <Select
        options={mockOptions}
        value="option1"
        onChange={onChange}
        size="xl"
      />
    );

    expect(containerXL.querySelector('.Select_xl')).toBeInTheDocument();

    const { container: containerSM } = render(
      <Select
        options={mockOptions}
        value="option1"
        onChange={onChange}
        size="sm"
      />
    );

    expect(containerSM.querySelector('.Select_sm')).toBeInTheDocument();
  });

  it('calls onChange with correct value when option is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select
        options={mockOptions}
        value="option1"
        onChange={onChange}
      />
    );

    const selectButton = screen.getByText('First Option').closest('div');
    await user.click(selectButton!);

    const thirdOption = screen.getByText('Third Option');
    await user.click(thirdOption);

    expect(onChange).toHaveBeenCalledWith('option3');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders custom suffix via renderSuffix', () => {
    const onChange = vi.fn();
    const renderSuffix = vi.fn((option) => (
      <span key={option.value} data-testid={`suffix-${option.value}`}>
        [Suffix: {option.value}]
      </span>
    ));

    render(
      <Select
        options={mockOptions}
        value="option1"
        onChange={onChange}
        renderSuffix={renderSuffix}
      />
    );

    expect(screen.getByTestId('suffix-option1')).toBeInTheDocument();
    expect(screen.getByText('[Suffix: option1]')).toBeInTheDocument();
  });
});

describe('accessibility', () => {
  it('applies custom className to wrapper', () => {
    const onChange = vi.fn();

    const { container } = render(
      <Select
        options={mockOptions}
        value="option1"
        onChange={onChange}
        className="custom-class"
      />
    );

    expect(container.querySelector('.Select__wrapper.custom-class')).toBeInTheDocument();
  });
});
