import styles from './index.scss';
import React from 'react';
import validate from '../../utils/validate';

class Card extends React.Component {
  render() {
    const {classID, style, title, children, suffix} = this.props;
    const props = {};
    if (!validate.isNil(classID)) props.id = classID;

    return (
      <div className={styles.card} style={style}>
        <h4 {...props}>{title}</h4>
        <div className={styles.cardContent}>{children}{validate.isNil(suffix) ? '' : suffix}</div>
      </div>
    );
  }
}

export default Card;
