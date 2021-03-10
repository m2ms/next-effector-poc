import Document from 'next/document';
import { withFork } from 'effector-next';

const enhance = withFork({ debug: true });

export default enhance(Document);
