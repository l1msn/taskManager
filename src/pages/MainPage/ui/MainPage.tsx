import React, { JSX } from 'react';
import Page from '@/widgets/Page';
import VoxelDog from "@/features/3DModel";
import {VStack} from "@/shared/ui/Stack";
import cls from './MainPage.module.scss'
import TypeAnimationText from "@/shared/ui/AnimationText";

const MainPage: React.FC = (): JSX.Element => {

    return (
        <Page data-testid={'MainPage'}>
            <VStack max className={cls.model} justify={'center'} align={'center'}>
                <TypeAnimationText
                    speed={30}
                    style={{
                        fontSize: '27px',
                    }}
                    text={{
                        ru: ['Время кодить, берем таски'],
                        en: ['Its time to code, takem tasks'],
                    }}
                />
                <VoxelDog/>
            </VStack>
        </Page>
    );
};

export default MainPage;
