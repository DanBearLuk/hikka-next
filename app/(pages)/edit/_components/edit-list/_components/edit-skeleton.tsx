import * as React from 'react';

import { range } from '@antfu/utils';

import EditHead from '@/app/(pages)/edit/_components/edit-list/_components/edit-head';
import EntryTableRow from '@/components/skeletons/entry-table-row';
import { Table, TableBody } from '@/components/ui/table';


const Component = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="overflow-x-auto">
                <Table className="table">
                    <EditHead />
                    <TableBody>
                        {range(1, 20).map((v) => (
                            <EntryTableRow key={v} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Component;
