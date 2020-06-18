let __EQUALS__  = ((a ,b ) => {return (a  === b );
} ) ;
let zero__QUESTION_MARK__  = ((a ) => {return (__EQUALS__ )(a ,0 );
} ) ;
let empty__QUESTION_MARK__  = ((coll ) => {return (zero__QUESTION_MARK__ )(((coll )[(`length` )]) );
} ) ;
let first  = ((coll ) => {return ((coll )[(`0` )]);
} ) ;
let rest  = ((coll ) => {return ((coll ).slice (1 ));
} ) ;
let cons  = ((el ,coll ) => {return [el ,...coll ];
} ) ;
let log  = ((...args ) => {return ((console ).log (...args ));
} ) ;
let plus  = ((a ,b ) => {return (a  + b );
} ) ;
let inc  = ((a ) => {return (plus )(a ,1 );
} ) ;
(log )((inc )(1 ) );
let map  = ((f ,coll ) => {return (((empty__QUESTION_MARK__ )(coll ) ) ?
(() => {return [];
} )()
:
(() => {return ((((el ) => {return (cons )((f )(el ) ,(map )(f ,(rest )(coll ) ) );
} ) )((first )(coll ) ) );
} )());
} ) ;
(log )((map )(inc ,[1 ,2 ,3 ] ) );
