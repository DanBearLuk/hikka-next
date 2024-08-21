import { FC } from 'react';

import P from '@/components/typography/p';
import Header from '@/components/ui/header';

import Appearance from '@/features/settings/profile/appearance';
import Description from '@/features/settings/profile/description';
import Username from '@/features/settings/profile/username';

interface Props {
    params: {
        slug: string;
    };
}

const ProfileSettingsPage: FC<Props> = async ({ params }) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col">
                <Header title="Профіль" />
                <P className="text-sm text-muted-foreground">
                    Налаштуйте вигляд та деталі свого профілю
                </P>
            </div>
            <Appearance />
            <Username />
            <Description />
        </div>
    );
};

export default ProfileSettingsPage;
