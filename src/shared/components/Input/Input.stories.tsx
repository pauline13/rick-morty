import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SearchIcon } from '@/shared/assets';

import { Input } from './Input';

type InputStoryArgs = {
  initialValue: string;
  placeholder?: string;
  showClear?: boolean;
  size?: 'xl' | 'sm';
  variant?: 'underline' | 'outline';
  withRightIcon?: boolean;
};

const StatefulInput = ({
  initialValue,
  placeholder,
  showClear,
  size,
  variant,
  withRightIcon
}: InputStoryArgs) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(initialValue);

  return (
    <Input
      placeholder={placeholder || t('filters.placeholder.name')}
      rightIcon={withRightIcon ? <SearchIcon /> : undefined}
      showClear={showClear}
      size={size}
      value={value}
      variant={variant}
      onChange={setValue}
    />
  );
};

const meta = {
  title: 'shared/components/Input',
  render: (args) => <StatefulInput {...args} />,
  args: {
    initialValue: 'Rick Sanchez',
    showClear: true,
    size: 'xl',
    variant: 'outline'
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    placeholder: {
      control: 'text'
    },
    initialValue: {
      control: 'text'
    }
  }
} satisfies Meta<InputStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Underline: Story = {
  args: {
    variant: 'underline'
  }
};

export const WithRightIcon: Story = {
  args: {
    withRightIcon: true
  }
};

export const Placeholder: Story = {
  args: {
    initialValue: '',
    variant: 'underline'
  }
};
