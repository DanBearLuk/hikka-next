'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useModalContext } from '@/utils/providers/ModalProvider';

import MingcuteTelegramFill from '~icons/mingcute/telegram-fill';
import SimpleIconsBuymeacoffee from '~icons/simple-icons/buymeacoffee';

import MaterialSymbolsCopyrightRounded from '~icons/material-symbols/copyright-rounded';

import MaterialSymbolsLightGridViewRounded from '~icons/material-symbols-light/grid-view-rounded';
import MaterialSymbolsEditRounded from '~icons/material-symbols/edit-rounded';

const Component = () => {
    const { switchModal } = useModalContext();
    const [drawer, setDrawer] = useState<HTMLInputElement | null>(null);

    useEffect(() => {
        setDrawer(
            document.getElementById('mobileNavDrawer') as HTMLInputElement,
        );
    }, []);

    const closeDrawer = () => {
        if (drawer) {
            drawer.checked = false;
        }
    };

    return (
        <div className="w-60 overflow-y-scroll overscroll-contain border-l border-l-secondary h-full bg-base-100 text-base-content">
            <ul className="menu menu-lg p-0 w-full [&_li>*]:rounded-none  mt-4">
                <li className="menu-title">Загальне</li>
                <li>
                    <Link href={'/anime'} onClick={closeDrawer}>
                        <MaterialSymbolsLightGridViewRounded />
                        Каталог
                    </Link>
                </li>
                <li>
                    <Link href={'/edit'} onClick={closeDrawer}>
                        <MaterialSymbolsEditRounded />
                        Правки
                    </Link>
                </li>
                <li className="menu-title">Соцмережі</li>
                <li>
                    <Link
                        href="https://t.me/hikka_io"
                        target="_blank"
                        onClick={closeDrawer}
                    >
                        <MingcuteTelegramFill />
                        Telegram
                    </Link>
                </li>
                <li>
                    <Link
                        href="https://www.buymeacoffee.com"
                        onClick={closeDrawer}
                        target="_blank"
                    >
                        <SimpleIconsBuymeacoffee />
                        Buy Me a Coffee
                    </Link>
                </li>
                <li className="menu-title">Інше</li>
                <li>
                    <button
                        onClick={() => {
                            closeDrawer();
                            switchModal('rightholder');
                        }}
                    >
                        <MaterialSymbolsCopyrightRounded />
                        Правовласникам
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Component;
