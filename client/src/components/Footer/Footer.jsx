import React from 'react';
import { withTranslation } from 'react-i18next';

import './footer.css'

function Footer({ t }) {
  return (
   <div className="footer" >
        <p>
					{t("Design by")} WallaRock
				</p>
    </div>
  )
}

export default withTranslation()(Footer);