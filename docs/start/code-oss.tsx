import { useEffect } from 'react';
import { LoggingInDisplay } from './vscode';

export default function VSCodeInsiders() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    window.location.replace(`codeoss://mintlify.document/auth?code=${code}`);
  }, []);
  return <LoggingInDisplay message="Bringing you back to Code OSS" />;
}
