'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { Fragment } from 'react';
import MaterialSymbolsNightlightOutlineRounded from '~icons/material-symbols/nightlight-outline-rounded';
import MaterialSymbolsSunnyOutlineRounded from '~icons/material-symbols/sunny-outline-rounded';

import H3 from '@/components/typography/h3';
import { Combobox } from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { useSettingsContext } from '@/services/providers/settings-provider';

const Component = () => {
    const { titleLanguage, setState: setSettingsState } = useSettingsContext();
    const { setTheme, theme } = useTheme();

    return (
        <div className="flex w-full flex-col gap-6 p-6">
            <div className="flex w-full flex-col gap-2">
                <Label>Тема сайту</Label>
                <Combobox
                    value={theme}
                    onChange={(value) => setTheme(value)}
                    options={[
                        {
                            label: (
                                <Fragment>
                                    <MaterialSymbolsNightlightOutlineRounded className="text-[1.2rem]" />
                                    Темна тема
                                </Fragment>
                            ),
                            value: 'dark',
                        },
                        {
                            label: (
                                <Fragment>
                                    <MaterialSymbolsSunnyOutlineRounded className="text-[1.2rem]" />
                                    Світла тема
                                </Fragment>
                            ),
                            value: 'light',
                        },
                    ]}
                />
            </div>
            <div className="flex w-full flex-col gap-2">
                <Label>Мова назв контенту</Label>
                <Combobox
                    value={titleLanguage}
                    onChange={(value) =>
                        setSettingsState!((prev) =>
                            prev
                                ? {
                                      ...prev,
                                      titleLanguage: value as
                                          | 'title_ua'
                                          | 'title_en'
                                          | 'title_ja',
                                  }
                                : prev,
                        )
                    }
                    options={[
                        { label: 'Українська', value: 'title_ua' },
                        { label: 'Англійська', value: 'title_en' },
                        { label: 'Нативна', value: 'title_ja' },
                    ]}
                />
            </div>
        </div>
    );
};

export default Component;
