import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { LoginModal } from 'features/AuthByUsername';

export default {
    title: 'features/LoginModal',
    component: LoginModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

export const LightLoginModal = Template.bind({});
LightLoginModal.args = {
    isOpen: true,
};
LightLoginModal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkLoginModal = Template.bind({});
DarkLoginModal.args = {
    isOpen: true,
};
DarkLoginModal.decorators = [ThemeDecorator(Theme.DARK)];
