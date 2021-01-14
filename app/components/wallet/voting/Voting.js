// @flow
import type { Node } from 'react';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { defineMessages, intlShape } from 'react-intl';
import globalMessages from '../../../i18n/global-messages';
import type { $npm$ReactIntl$IntlFormat } from 'react-intl';
import { Button } from 'react-polymorph/lib/components/Button';
import { ButtonSkin } from 'react-polymorph/lib/skins/simple/ButtonSkin';
import AppStoreBadge from '../../../assets/images/transaction/app-store-badge.inline.svg';
import PlayStoreBadge from '../../../assets/images/transaction/google-play-badge.inline.svg';

import styles from './Voting.scss';

const messages = defineMessages({
  lineTitle: {
    id: 'wallet.voting.lineTitle',
    defaultMessage: '!!!Any ADA registered in transaction to vote will be transfered from your currently selected wallet',
  },
  line2: {
    id: 'wallet.voting.line2',
    defaultMessage: '!!!Before you begin, make sure to complete steps below',
  },
  line3: {
    id: 'wallet.voting.line3',
    defaultMessage: '!!!Download the Catalyst Voting App.',
  },
  line4: {
    id: 'wallet.voting.line4',
    defaultMessage: '!!!Open the Catalyst Voting App and click on the Complete registration button.',
  },
});

type Props = {|
  start: void => void
|};

@observer
export default class Voting extends Component<Props> {
  static contextTypes: {| intl: $npm$ReactIntl$IntlFormat |} = {
    intl: intlShape.isRequired,
  };
  

  render(): Node {
    const { intl } = this.context;;
    const buttonClasses = classnames([
      'primary',
    ]);

    return (
      <div className={styles.voting}>
        <div className={classnames([styles.lineTitle, styles.firstItem])}>
          {intl.formatMessage(messages.lineTitle)}
        </div>

        <div className={styles.lineText}>
          {intl.formatMessage(messages.line2)}
        </div>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.number}>
              <span>1</span>
            </div>
            <div className={styles.image}>
              <div className={styles.imagePlaceholder} />
            </div>
            <div className={classnames([styles.lineText])}>
              {intl.formatMessage(messages.line3)}
            </div>
            <div className={styles.appBadges}>
              <AppStoreBadge />
              <PlayStoreBadge />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.number}>
              <span>2</span>
            </div>
            <div className={styles.image}>
              <div className={styles.imagePlaceholder} />
            </div>
            <div className={classnames([styles.lineText])}>
              {intl.formatMessage(messages.line4)}
            </div>
          </div>
        </div>
        <div className={styles.registerButton}>
          <Button
            className={buttonClasses}
            label={intl.formatMessage(globalMessages.registerLabel)}
            onMouseUp={this.props.start}
            skin={ButtonSkin}
          />
        </div>
      </div>
    );
  }
}
