import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Input } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const LightInput = Template.bind({});
LightInput.args = {
    placeholder: 'Light Input',
    value: 'Light Input',
};
LightInput.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkInput = Template.bind({});
DarkInput.args = {
    placeholder: 'Dark Input',
    value: 'Dark Input',
};
DarkInput.decorators = [ThemeDecorator(Theme.DARK)];
