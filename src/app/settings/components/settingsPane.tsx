/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/components/Panel';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { DefaultButton, ActionButton } from 'office-ui-fabric-react/lib/components/Button';
import { Toggle } from 'office-ui-fabric-react/lib/components/Toggle';
import { ResourceKeys } from '../../../localization/resourceKeys';
import { Theme, useThemeContext } from '../../shared/contexts/themeContext';
import { THEME_SELECTION } from '../../constants/browserStorage';
import { ROUTE_PARTS, ROUTE_PARAMS } from '../../constants/routes';
import '../../css/_headerPane.scss';

export const SettingsPane: React.FC = () => {
    const [ showPanel, setShowPanel ] = React.useState<boolean>(false);
    const [ darkTheme, setDarkTheme ] = React.useState<boolean>(false);

    const userLanguage = JSON.parse(localStorage.getItem('userLanguage')) || 'en';
    const [ language, setLanguage ] = React.useState<string>(userLanguage);
    const { t, i18n } = useTranslation();

    const { updateTheme } = useThemeContext();

    React.useEffect(() => {
        const theme = localStorage.getItem(THEME_SELECTION);
        setDarkTheme(theme === Theme.dark || theme === Theme.highContrastBlack);
    },              [darkTheme]);

    React.useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem('userLanguage', JSON.stringify(language));
        // tslint:disable-next-line:no-console
        console.log(language);
    },              [language, i18n]);

    const togglePanelVisibility = () => {
        setShowPanel(!showPanel);
    };

    const toggleTheme = () => {
        const newDarkTheme = !darkTheme;
        setDarkTheme(newDarkTheme);
        updateTheme(newDarkTheme);
    };

    const handleChange = (newValue: React.SetStateAction<string>) => {
        setLanguage(newValue);
    };

    const renderFooter = () => {
        return (
            <footer className="header-footer">
                <section className="footer-buttons">
                    <DefaultButton
                        type="reset"
                        text={t(ResourceKeys.common.close)}
                        onClick={togglePanelVisibility}
                    />
                </section>
            </footer>
        );
    };

    return (
        <>
            <ActionButton
                iconProps={{iconName: 'Settings'}}
                onClick={togglePanelVisibility}
                text={t(ResourceKeys.header.settings.launch)}
                ariaLabel={t(ResourceKeys.header.settings.launch)}
            />

            <Panel
                className="headerPane"
                role="dialog"
                isOpen={showPanel}
                isLightDismiss={true}
                onDismiss={togglePanelVisibility}
                type={PanelType.smallFixedFar}
                isFooterAtBottom={true}
                onRenderFooter={renderFooter}
                closeButtonAriaLabel={t(ResourceKeys.common.close)}
            >
                <header className="panel-header">
                    <h2>{t(ResourceKeys.settings.headerText)}</h2>
                </header>
                <section aria-label={t(ResourceKeys.settings.configuration.headerText)}>
                    <h3 role="heading" aria-level={1}>{t(ResourceKeys.settings.configuration.headerText)}</h3>
                    <span>{t(ResourceKeys.settings.configuration.redirect)}</span>
                    <Link
                        className="home-link"
                        onClick={togglePanelVisibility}
                        href={`#/${ROUTE_PARTS.HOME}`}
                    >
                        {t(ResourceKeys.settings.configuration.redirectLink)}
                    </Link>
                </section>
                <section aria-label={t(ResourceKeys.settings.modelDefinitions.headerText)}>
                    <h3 role="heading" aria-level={1}>{t(ResourceKeys.settings.modelDefinitions.headerText)}</h3>
                    <span>{t(ResourceKeys.settings.modelDefinitions.redirect)}</span>
                    <Link
                        onClick={togglePanelVisibility}
                        className="home-link"
                        href={`#/${ROUTE_PARTS.HOME}/${ROUTE_PARTS.MODEL_REPOS}?${ROUTE_PARAMS.NAV_FROM}`}
                    >
                        {t(ResourceKeys.settings.modelDefinitions.redirectLink)}
                    </Link>
                </section>
                <section aria-label={t(ResourceKeys.settings.theme.headerText)}>
                    <h3 role="heading" aria-level={1}>{t(ResourceKeys.settings.theme.headerText)}</h3>
                    <Toggle
                        onText={t(ResourceKeys.settings.theme.darkTheme)}
                        offText={t(ResourceKeys.settings.theme.lightTheme)}
                        onChange={toggleTheme}
                        checked={darkTheme}
                    />
                </section>
                <section aria-label="Language">
                    <h3 role="heading" aria-level={1}>Language</h3>
                    <select
                        value={language}
                        onChange={e => handleChange(e.target.value)}
                    >
                        <option key="en" value="en">English</option>
                        <option key="ja" value="ja">日本語</option>
                    </select>
                </section>
            </Panel>
        </>
    );
};
