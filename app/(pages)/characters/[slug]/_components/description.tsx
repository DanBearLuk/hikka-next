'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import MDViewer from '@/app/_components/markdown/viewer/MD-viewer';
import SubHeader from '@/app/_components/sub-header';
import { Button } from '@/app/_components/ui/button';


const Component = () => {
    const queryClient = useQueryClient();
    const [active, setActive] = useState<'description_ua'>('description_ua');
    const params = useParams();
    const character: Hikka.Character | undefined = queryClient.getQueryData([
        'character',
        params.slug,
    ]);

    if (!character || (!character.description_ua)) {
        return null;
    }

    return (
        <div className="flex flex-col gap-8">
            <SubHeader title="Опис">
                <div className="flex gap-4 flex-wrap">
                    {character.description_ua && (
                        <Button
                            size="badge"
                            variant={
                                active === 'description_ua'
                                    ? 'secondary'
                                    : 'outline'
                            }
                            onClick={() => setActive('description_ua')}
                        >
                            <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                                UA
                            </span>
                        </Button>
                    )}
                </div>
            </SubHeader>
            <MDViewer>{character[active] || character.description_ua}</MDViewer>
        </div>
    );
};

export default Component;